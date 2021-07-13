<?php

declare(strict_types=1);

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace EBT\ExtensionBuilder\Service;

use EBT\ExtensionBuilder\Configuration\ExtensionBuilderConfigurationManager;
use EBT\ExtensionBuilder\Domain\Model\DomainObject;
use EBT\ExtensionBuilder\Domain\Model\DomainObject\Action;
use EBT\ExtensionBuilder\Domain\Model\DomainObject\FileProperty;
use EBT\ExtensionBuilder\Domain\Model\DomainObject\Relation\AbstractRelation;
use EBT\ExtensionBuilder\Domain\Model\DomainObject\Relation\ZeroToManyRelation;
use EBT\ExtensionBuilder\Utility\Tools;
use Exception;
use TYPO3\CMS\Core\SingletonInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Domain\Model\FileReference;

/**
 * Builder for domain objects
 */
class ObjectSchemaBuilder implements SingletonInterface
{
    /**
     * @var ExtensionBuilderConfigurationManager
     */
    protected $configurationManager;
    /**
     * @var string[]
     */
    protected $relatedForeignTables = [];

    public function injectConfigurationManager(ExtensionBuilderConfigurationManager $configurationManager): void
    {
        $this->configurationManager = $configurationManager;
    }

    /**
     * @param array $jsonDomainObject
     * @return DomainObject $domainObject
     * @throws Exception
     */
    public function build(array $jsonDomainObject): DomainObject
    {
        $domainObject = GeneralUtility::makeInstance(DomainObject::class);
        $domainObject->setUniqueIdentifier($jsonDomainObject['objectsettings']['uid']);

        $domainObject->setName($jsonDomainObject['name']);
        $domainObject->setDescription($jsonDomainObject['objectsettings']['description']);
        if ($jsonDomainObject['objectsettings']['type'] === 'Entity') {
            $domainObject->setEntity(true);
        } else {
            $domainObject->setEntity(false);
        }
        $domainObject->setAggregateRoot($jsonDomainObject['objectsettings']['aggregateRoot'] ?? false);
        if (!empty($jsonDomainObject['objectsettings']['tableName'])) {
            $domainObject->setTableName($jsonDomainObject['objectsettings']['tableName']);
        }
        $domainObject->setSorting($jsonDomainObject['objectsettings']['sorting'] ?? false);
        $domainObject->setAddDeletedField($jsonDomainObject['objectsettings']['addDeletedField'] ?? false);
        $domainObject->setAddHiddenField($jsonDomainObject['objectsettings']['addHiddenField'] ?? false);
        $domainObject->setAddStarttimeEndtimeFields($jsonDomainObject['objectsettings']['addStarttimeEndtimeFields'] ?? false);
        $domainObject->setCategorizable($jsonDomainObject['objectsettings']['categorizable'] ?? false);

        // extended settings
        if (!empty($jsonDomainObject['objectsettings']['mapToTable'])) {
            $domainObject->setMapToTable($jsonDomainObject['objectsettings']['mapToTable']);
        }
        if (!empty($jsonDomainObject['objectsettings']['parentClass'])) {
            $domainObject->setParentClass($jsonDomainObject['objectsettings']['parentClass']);
        }
        // properties
        if (isset($jsonDomainObject['propertyGroup']['properties'])) {
            foreach ($jsonDomainObject['propertyGroup']['properties'] as $propertyJsonConfiguration) {
                $propertyType = $propertyJsonConfiguration['propertyType'];
                if (in_array($propertyType, ['Image', 'File'])
                    && !empty($propertyJsonConfiguration['maxItems'])
                    && $propertyJsonConfiguration['maxItems'] > 1
                ) {
                    $propertyJsonConfiguration['relationType'] = 'zeroToMany';
                    $propertyJsonConfiguration['relationName'] = $propertyJsonConfiguration['propertyName'];
                    $propertyJsonConfiguration['relationDescription'] = $propertyJsonConfiguration['propertyDescription'];
                    $propertyJsonConfiguration['foreignRelationClass'] = FileReference::class;
                    $propertyJsonConfiguration['type'] = $propertyJsonConfiguration['propertyType'];

                    $property = $this->buildRelation($propertyJsonConfiguration, $domainObject);
                } else {
                    $property = self::buildProperty($propertyJsonConfiguration);
                }
                $domainObject->addProperty($property);
            }
        }

        // relations
        if (isset($jsonDomainObject['relationGroup']['relations'])) {
            foreach ($jsonDomainObject['relationGroup']['relations'] as $relationJsonConfiguration) {
                $relation = $this->buildRelation($relationJsonConfiguration, $domainObject);
                $domainObject->addProperty($relation);
            }
        }

        // actions
        if (isset($jsonDomainObject['actionGroup'])) {
            foreach ($jsonDomainObject['actionGroup'] as $jsonActionName => $actionValue) {
                if ($actionValue === true) {
                    $jsonActionName = preg_replace('/^_default[0-9]_*/', '', $jsonActionName);
                    if ($jsonActionName === 'edit_update' || $jsonActionName === 'new_create') {
                        $actionNames = explode('_', $jsonActionName);
                    } else {
                        $actionNames = [$jsonActionName];
                    }

                    foreach ($actionNames as $actionName) {
                        $action = GeneralUtility::makeInstance(Action::class);
                        $action->setName($actionName);
                        $domainObject->addAction($action);
                    }
                    continue;
                }

                if ($jsonActionName === 'customActions' && !empty($actionValue)) {
                    foreach ($actionValue as $actionName) {
                        $action = GeneralUtility::makeInstance(Action::class);
                        $action->setName($actionName);
                        $action->setCustomAction(true);
                        $domainObject->addAction($action);
                    }
                }
            }
        }
        return $domainObject;
    }

    /**
     * @param array $relationJsonConfiguration
     * @param DomainObject $domainObject
     * @return AbstractRelation
     * @throws Exception
     */
    public function buildRelation(array $relationJsonConfiguration, DomainObject $domainObject): AbstractRelation
    {
        $relationSchemaClassName = 'EBT\\ExtensionBuilder\\Domain\\Model\\DomainObject\\Relation\\';
        $relationSchemaClassName .= ucfirst($relationJsonConfiguration['relationType']) . 'Relation';
        if (!class_exists($relationSchemaClassName)) {
            throw new Exception(
                'Relation of type ' . $relationSchemaClassName . ' not found (configured in "' .
                $relationJsonConfiguration['relationName'] . '")'
            );
        }
        /** @var AbstractRelation $relation */
        $relation = new $relationSchemaClassName();
        $relation->setName($relationJsonConfiguration['relationName']);
        $relation->setLazyLoading((bool)$relationJsonConfiguration['lazyLoading']);
        $relation->setNullable((bool)$relationJsonConfiguration['propertyIsNullable']);
        $relation->setExcludeField((bool)$relationJsonConfiguration['propertyIsExcludeField']);
        $relation->setDescription($relationJsonConfiguration['relationDescription']);
        $relation->setUniqueIdentifier($relationJsonConfiguration['uid']);
        $relation->setType($relationJsonConfiguration['type']);

        if (!empty($relationJsonConfiguration['foreignRelationClass'])) {
            // relations without wires
            if (strpos($relationJsonConfiguration['foreignRelationClass'], '\\') > 0) {
                // add trailing slash if not set
                $relationJsonConfiguration['foreignRelationClass'] = '\\' . $relationJsonConfiguration['foreignRelationClass'];
            }
            $relation->setForeignClassName($relationJsonConfiguration['foreignRelationClass']);
            $relation->setRelatedToExternalModel(true);
            $tableName = $this->configurationManager->getPersistenceTable(
                $relationJsonConfiguration['foreignRelationClass']
            );
            if (!empty($relationJsonConfiguration['renderType'])) {
                $relation->setRenderType($relationJsonConfiguration['renderType']);
            }
            $foreignDatabaseTableName = $tableName ?? Tools::parseTableNameFromClassName(
                $relationJsonConfiguration['foreignRelationClass']
            );
            $relation->setForeignDatabaseTableName($foreignDatabaseTableName);
            if ($relation instanceof ZeroToManyRelation) {
                $foreignKeyName = strtolower($domainObject->getName());
                if (ValidationService::isReservedMYSQLWord($foreignKeyName)) {
                    $foreignKeyName = 'tx_' . $foreignKeyName;
                }
                if (isset($this->relatedForeignTables[$foreignDatabaseTableName])) {
                    $foreignKeyName .= $this->relatedForeignTables[$foreignDatabaseTableName];
                    $this->relatedForeignTables[$foreignDatabaseTableName]++;
                } else {
                    $this->relatedForeignTables[$foreignDatabaseTableName] = 1;
                }
                $relation->setForeignKeyName($foreignKeyName);
                $relation->setForeignDatabaseTableName($foreignDatabaseTableName);
            }
            if ($relation->isFileReference()) {
                $relation->setRenderType('inline');
                if (!empty($relationJsonConfiguration['maxItems'])) {
                    /** @var FileProperty $relation */
                    $relation->setMaxItems((int)$relationJsonConfiguration['maxItems']);
                    if (!empty($relationJsonConfiguration['allowedFileTypes'])) {
                        $relation->setAllowedFileTypes($relationJsonConfiguration['allowedFileTypes']);
                    }
                }
            }
        }
        return $relation;
    }

    /**
     * @param array $propertyJsonConfiguration
     * @return object
     * @throws Exception
     */
    public static function buildProperty(array $propertyJsonConfiguration)
    {
        $propertyType = $propertyJsonConfiguration['propertyType'];
        $propertyClassName = 'EBT\\ExtensionBuilder\\Domain\Model\\DomainObject\\' . $propertyType . 'Property';
        if (!class_exists($propertyClassName)) {
            throw new Exception('Property of type ' . $propertyType . ' not found');
        }
        /** @var DomainObject\AbstractProperty $property */
        $property = GeneralUtility::makeInstance($propertyClassName);
        $property->setUniqueIdentifier($propertyJsonConfiguration['uid']);
        $property->setName($propertyJsonConfiguration['propertyName']);
        $property->setDescription($propertyJsonConfiguration['propertyDescription']);

        if ($propertyType === 'File' && !empty($propertyJsonConfiguration['allowedFileTypes'])) {
            $property->setAllowedFileTypes($propertyJsonConfiguration['allowedFileTypes']);
        }

        if (isset($propertyJsonConfiguration['propertyIsRequired'])) {
            $property->setRequired($propertyJsonConfiguration['propertyIsRequired']);
        }
        if (isset($propertyJsonConfiguration['propertyIsNullable'])) {
            $property->setNullable($propertyJsonConfiguration['propertyIsNullable']);
        }
        if (isset($propertyJsonConfiguration['propertyIsExcludeField'])) {
            $property->setExcludeField($propertyJsonConfiguration['propertyIsExcludeField']);
        }
        if (isset($propertyJsonConfiguration['propertyIsL10nModeExclude'])) {
            $property->setL10nModeExclude($propertyJsonConfiguration['propertyIsL10nModeExclude']);
        }
        if ($property->isFileReference() && !empty($propertyJsonConfiguration['maxItems'])) {
            $property->setMaxItems((int)$propertyJsonConfiguration['maxItems']);
        }
        return $property;
    }
}
