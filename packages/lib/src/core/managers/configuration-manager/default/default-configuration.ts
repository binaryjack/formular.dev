import { IConfiguration, IValidationPattern } from '../interfaces'

export const defaultConfiguration: IConfiguration = {
    name: 'default-formular-configuration',
    targetEnvironment: 'development',
    cultures: {
        defaultCulture: {
            name: 'fr-CH',
            dateFormat: 'dd/MM/yyyy' as any,
            timeFormat: 'HH:mm:ss',
            currencySymbol: 'CHF',
            separator: '.'
        },
        supportedCultures: [
            {
                name: 'en-US',
                dateFormat: 'MM/dd/yyyy' as any,
                timeFormat: 'hh:mm:ss tt',
                currencySymbol: '$',
                separator: '/'
            },
            {
                name: 'fr-FR',
                dateFormat: 'dd/MM/yyyy' as any,
                timeFormat: 'HH:mm:ss',
                currencySymbol: '€',
                separator: '/'
            },
            {
                name: 'de-DE',
                dateFormat: 'dd/MM/yyyy' as any,
                timeFormat: 'HH:mm:ss',
                currencySymbol: '€',
                separator: '/'
            }
        ],
        lokalizeTokensReplacement: [
            {
                name: 'validationDataToken1',
                token: '|data|'
            },
            {
                name: 'validationDataToken2',
                token: '|data2|'
            }
        ]
    },
    rendering: {
        components: [
            {
                name: 'drawer',
                height: '350px',
                width: '250px'
            }
        ],
        commands: [
            {
                name: 'primary',
                rounded: true,
                size: 'sm',
                width: '1.8em',
                height: '1.8em',
                className: 'ml-0'
            },
            {
                name: 'submit',
                rounded: true,
                size: 'lg',
                width: '5em',
                height: '5em',
                className: 'ml-0'
            }
        ],
        suffixes: [
            {
                name: 'labelId',
                value: '-label'
            },
            {
                name: 'describedById',
                value: '-describedby'
            }
        ]
    },
    behavior: {
        form: {
            name: 'default-form-behavior',
            enforceConfigurationCheck: true,
            validationTriggers: ['onBlur', 'onSubmit']
        },
        validations: {
            triggers: [
                {
                    name: 'onValidate',
                    triggerDelay: 500
                }
            ],
            patterns: [
                {
                    name: 'email-pattern',
                    cultureName: 'en-US',
                    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                },
                {
                    name: 'phone-pattern-us',
                    cultureName: 'en-US',
                    regex: /^\+?1?[-\s.]?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4}$/
                },
                {
                    name: 'postal-code-us',
                    cultureName: 'en-US',
                    regex: /^\d{5}(-\d{4})?$/
                },
                {
                    name: 'postal-code-fr',
                    cultureName: 'fr-FR',
                    regex: /^\d{5}$/
                }
            ] as IValidationPattern[]
        },
        customValidations: [],
        events: [
            {
                name: 'onChange',
                triggerDelay: 500
            },
            {
                name: 'onClick',
                triggerDelay: 500
            },
            {
                name: 'onSelect',
                triggerDelay: 500
            },
            {
                name: 'onFocus',
                triggerDelay: 500
            },
            {
                name: 'onBlur',
                triggerDelay: 500
            },
            {
                name: 'onKeyDown',
                triggerDelay: 500
            },
            {
                name: 'onKeyUp',
                triggerDelay: 500
            },
            {
                name: 'onUiUpdate',
                triggerDelay: 500
            },
            {
                name: 'onObserve',
                triggerDelay: 500
            }
        ]
    }
}
