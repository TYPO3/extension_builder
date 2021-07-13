extbaseModeling_wiringEditorLanguage.modules.push({
  name: 'New Model Object',
  container: {	// Configuration according to WireIt.Container.options
    xtype: 'WireIt.FormContainer',
    title: 'Title',	// this will be overriden in WiteIt.WiringEditor.addModule() with the module name, so it could also be left empty here
    preventSelfWiring: false,
    fields: [
      {
        type: 'inplaceedit',
        inputParams: {
          name: 'name',
          className: 'inputEx-Field extbase-modelTitleEditor',
          editorField: {
            type: 'string',
            inputParams: {
              required: true,
              firstCharNonNumeric: true
            }
          },
          animColors: {from: '#cccccc', to: '#cccccc'}
        }
      },
      {
        type: 'group',
        inputParams: {
          collapsible: true,
          collapsed: true,
          legend: TYPO3.settings.extensionBuilder._LOCAL_LANG.domainObjectSettings,
          className: 'objectSettings',
          name: 'objectsettings',
          fields: [
            {
              inputParams: {
                name: 'uid',
                className: 'hiddenField'
              }
            },
            {
              type: 'select',
              inputParams: {
                name: 'type',
                advancedMode: true,
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.objectType,
                description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_objectType,
                selectValues: [
                  'Entity',
                  'ValueObject'
                ],
                selectOptions: [
                  TYPO3.settings.extensionBuilder._LOCAL_LANG.entity,
                  TYPO3.settings.extensionBuilder._LOCAL_LANG.valueObject
                ]
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: 'aggregateRoot',
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.isAggregateRoot,
                description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_isAggregateRoot,
                value: false
              }
            },
            {
                type: 'string',
                inputParams: {
                    name: 'tableName',
                    advancedMode: true,
                    label: TYPO3.settings.extensionBuilder._LOCAL_LANG.tableName,
                    description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_tableName,
                    required: false
                }
            },
            {
              type: 'boolean',
              inputParams: {
                name: 'sorting',
                advancedMode: true,
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.enableSorting,
                description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_enableSorting,
                value: false
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: 'addDeletedField',
                advancedMode: true,
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.addDeletedField,
                description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_addDeletedField,
                value: true
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: 'addHiddenField',
                advancedMode: true,
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.addHiddenField,
                description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_addHiddenField,
                value: true
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: 'addStarttimeEndtimeFields',
                advancedMode: true,
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.addStarttimeEndtimeFields,
                description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_addStarttimeEndtimeFields,
                value: true
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: 'categorizable',
                advancedMode: true,
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.enableCategorizable,
                description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_enableCategorizable,
                value: false
              }
            },
            {
              type: 'text',
              inputParams: {
                name: 'description',
                className: 'bottomBorder',
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.description,
                placeholder: TYPO3.settings.extensionBuilder._LOCAL_LANG.description,
                required: false,
                cols: 20,
                rows: 2
              }
            },
            {
              type: 'string',
              inputParams: {
                name: 'mapToTable',
                advancedMode: true,
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.mapToTable,
                description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_mapToTable,
                required: false
              }
            },
            {
              type: 'string',
              inputParams: {
                name: 'parentClass',
                advancedMode: true,
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.parentClass,
                placeholder: '\\Fully\\Qualified\\Classname',
                description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_parentClass,
                required: false
              }
            }
          ]
        }
      },
      {
        type: 'group',
        inputParams: {
          collapsible: true,
          collapsed: true,
          legend: TYPO3.settings.extensionBuilder._LOCAL_LANG.defaultActions,
          name: 'actionGroup',
          className: 'actionGroup',
          fields: [
            {
              type: 'boolean',
              inputParams: {
                name: '_default0_index',
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.index,
                value: false
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: '_default1_list',
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.list,
                value: false
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: '_default2_show',
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.show,
                value: false
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: '_default3_new_create',
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.create_new,
                value: false
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: '_default4_edit_update',
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.edit_update,
                value: false
              }
            },
            {
              type: 'boolean',
              inputParams: {
                name: '_default5_delete',
                label: TYPO3.settings.extensionBuilder._LOCAL_LANG.delete,
                value: false
              }
            },
            {
              type: 'list',
              inputParams: {
                label: 'Custom actions',
                name: 'customActions',
                sortable: true,
                elementType: {
                  type: 'input',
                  inputParams: {
                    name: 'customAction',
                    label: TYPO3.settings.extensionBuilder._LOCAL_LANG.customAction,
                    forceAlphaNumeric: true,
                    firstCharNonNumeric: true,
                    lcFirst: true
                  }
                }
              }
            }
          ]
        }
      },
      {
        type: 'group',
        inputParams: {
          collapsible: true,
          collapsed: true,
          className: 'properties',
          legend: TYPO3.settings.extensionBuilder._LOCAL_LANG.properties,
          name: 'propertyGroup',
          fields: [
            {
              type: 'list',
              inputParams: {
                label: '',
                name: 'properties',
                wirable: false,
                sortable: true,
                elementType: {
                  type: 'group',
                  inputParams: {
                    name: 'property',
                    className: 'propertyGroup',
                    fields: [
                      {
                        type: 'hidden',
                        inputParams: {
                          name: 'uid',
                          className: 'hiddenField'
                        }
                      },
                      {
                        type: 'string',
                        inputParams: {
                          name: 'propertyName',
                          forceAlphaNumeric: true,
                          lcFirst: true,
                          firstCharNonNumeric: true,
                          placeholder: TYPO3.settings.extensionBuilder._LOCAL_LANG.propertyName,
                          description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_propertyName,
                          required: true
                        }
                      },
                      {
                        type: 'select',
                        inputParams: {
                          name: 'propertyType',
                          //label: TYPO3.settings.extensionBuilder._LOCAL_LANG.propertyType,
                          description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_propertyType,
                          selectValues: [
                            'String',
                            'Text',
                            'RichText',
                            'Password',
                            'Email',
                            'Integer',
                            'Float',
                            'Boolean',
                            'NativeDate',
                            'NativeDateTime',
                            'Date',
                            'DateTime',
                            'NativeTime',
                            'Time',
                            'TimeSec',
                            'Select',
                            'File',
                            'Image'
                          ],
                          selectOptions: [
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.string,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.text,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.richText,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.password,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.email,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.integer,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.floatingPoint,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.boolean,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.nativeDate,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.nativeDateTime,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.date,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.dateTime,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.nativeTime,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.time,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.timeSec,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.selectList,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.file,
                            TYPO3.settings.extensionBuilder._LOCAL_LANG.image
                          ]
                        }
                      },
                      {
                        type: 'text',
                        inputParams: {
                          advancedMode: true,
                          name: 'propertyDescription',
                          placeholder: TYPO3.settings.extensionBuilder._LOCAL_LANG.description,
                          cols: 23,
                          rows: 2
                        }
                      },
                      {
                        type: 'string',
                        inputParams: {
                          classname: 'textfieldWrapper dependant fileOnly',
                          label: TYPO3.settings.extensionBuilder._LOCAL_LANG.allowedFileTypes,
                          description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_allowedFileTypes,
                          advancedMode: true,
                          name: 'allowedFileTypes'
                        }
                      },
                      {
                        type: 'string',
                        inputParams: {
                          classname: 'textfieldWrapper dependant fileOnly imageOnly small',
                          label: TYPO3.settings.extensionBuilder._LOCAL_LANG.maxItems,
                          advancedMode: true,
                          name: 'maxItems',
                          value: 1
                        }
                      },
                      {
                        type: 'boolean',
                        inputParams: {
                          label: TYPO3.settings.extensionBuilder._LOCAL_LANG.isRequired,
                          advancedMode: true,
                          name: 'propertyIsRequired',
                          value: false
                        }
                      },
                      {
                        type: 'boolean',
                        inputParams: {
                          classname: 'dependant stringOnly textOnly passwordOnly emailOnly integerOnly floatOnly dateOnly dateTimeOnly dateTimeStampOnly timeOnly timeTimeStampOnly timeSecOnly',
                          label: TYPO3.settings.extensionBuilder._LOCAL_LANG.isNullable,
                          advancedMode: true,
                          name: 'propertyIsNullable',
                          value: false
                        }
                      },
                      {
                        type: 'boolean',
                        inputParams: {
                          label: TYPO3.settings.extensionBuilder._LOCAL_LANG.isExcludeField,
                          advancedMode: true,
                          name: 'propertyIsExcludeField',
                          description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_isExcludeField,
                          value: true
                        }
                      },
                      {
                        type: 'boolean',
                        inputParams: {
                          label: TYPO3.settings.extensionBuilder._LOCAL_LANG.isL10nModeExclude,
                          advancedMode: true,
                          name: 'propertyIsL10nModeExclude',
                          description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_isL10nModeExclude,
                          value: false
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      },
      {
        type: 'group',
        inputParams: {
          collapsible: false,
          collapsed: false,
          legend: TYPO3.settings.extensionBuilder._LOCAL_LANG.relations,
          name: 'relationGroup',
          fields: [
            {
              type: 'list',
              inputParams: {
                name: 'relations',
                className: 'relations',
                wirable: false,
                sortable: true,
                elementType: {
                  type: 'group',
                  inputParams: {
                    name: 'relation',
                    className: 'relationGroup',
                    fields: [
                      {
                        type: 'hidden',
                        inputParams: {
                          name: 'uid',
                          className: 'hiddenField'
                        }
                      },
                      {
                        type: 'string',
                        inputParams: {
                          placeholder: TYPO3.settings.extensionBuilder._LOCAL_LANG.relationName,
                          name: 'relationName',
                          forceAlphaNumeric: true,
                          firstCharNonNumeric: true,
                          lcFirst: true,
                          description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_relationName,
                          required: true
                        }
                      },
                      {
                        type: 'boolean',
                        inputParams: {
                          name: 'propertyIsExcludeField',
                          advancedMode: true,
                          label: TYPO3.settings.extensionBuilder._LOCAL_LANG.isExcludeField,
                          description: TYPO3.settings.extensionBuilder._LOCAL_LANG.descr_isExcludeField,
                          value: true
                        }
                      },
                      {
                        type: 'text',
                        inputParams: {
                          name: 'relationDescription',
                          label: TYPO3.settings.extensionBuilder._LOCAL_LANG.description,
                          placeholder: TYPO3.settings.extensionBuilder._LOCAL_LANG.description,
                          required: false,
                          cols: 20,
                          rows: 3
                        }
                      },
                      {
                        type: 'string',
                        inputParams: {
                          label: '',
                          name: 'relationWire',
                          required: false,
                          wirable: true,
                          className: 'terminalFieldWrap',
                          ddConfig: {
                            type: 'input',
                            allowedTypes: ['output']
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    ],
    terminals: [
      {
        name: 'SOURCES',
        direction: [0, -1],
        offsetPosition: {
          left: 5,
          top: -2
        },
        ddConfig: {
          type: 'output',
          allowedTypes: ['input']
        }
      }
    ]
  }
});
