<?php

namespace EBT\ExtensionBuilder\Domain\Model\DomainObject;

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

class SlugProperty extends AbstractProperty
{
    /**
     * the property's default value
     *
     * @var string
     */
    protected $defaultValue = '';
    /**
     * @var bool
     */
    protected $searchable = true;

    public function getTypeForComment(): string
    {
        return 'string';
    }

    public function getTypeHint(): string
    {
        return '';
    }

    public function getSqlDefinition(): string
    {
        return $this->getFieldName() . " varchar(255) DEFAULT '' NOT NULL,";
    }
}
