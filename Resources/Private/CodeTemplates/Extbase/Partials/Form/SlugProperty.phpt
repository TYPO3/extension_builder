[
    'type' => 'slug',
    'generatorOptions' => [
        'fields' => ['title', 'nav_title'],
        'fieldSeparator' => '-',
        'replacements' => [
            '/' => '',
        ],
    ],
    'fallbackCharacter' => '-',
    'size' => 50,
    'eval' => 'uniqueInPid',
],
