import { IConfiguration } from './interfaces/i-configuration'
import { IValidationPattern } from './interfaces/i-validation-pattern'

/**
 * Configuration validator utility
 */
export const ConfigurationValidator = function (this: any) {
    /**
     * Validates required properties of a configuration object
     * @param config - Configuration object to validate
     * @returns Validation result with errors if any
     */
    this.validate = function (config: any): { isValid: boolean; errors: string[] } {
        const errors: string[] = []

        if (!config) {
            errors.push('Configuration is required')
            return { isValid: false, errors }
        }

        // Validate required top-level properties
        if (!config.name || typeof config.name !== 'string') {
            errors.push('Configuration name is required and must be a string')
        }

        if (!config.targetEnvironment || typeof config.targetEnvironment !== 'string') {
            errors.push('Target environment is required and must be a string')
        }

        // Validate cultures
        if (!config.cultures) {
            errors.push('Cultures configuration is required')
        } else {
            if (!config.cultures.defaultCulture) {
                errors.push('Default culture is required')
            }
            if (!Array.isArray(config.cultures.supportedCultures)) {
                errors.push('Supported cultures must be an array')
            }
            if (!Array.isArray(config.cultures.lokalizeTokensReplacement)) {
                errors.push('Lokalize tokens replacement must be an array')
            }
        }

        // Validate rendering
        if (!config.rendering) {
            errors.push('Rendering configuration is required')
        } else {
            if (!Array.isArray(config.rendering.components)) {
                errors.push('Rendering components must be an array')
            }
            if (!Array.isArray(config.rendering.commands)) {
                errors.push('Rendering commands must be an array')
            }
            if (!Array.isArray(config.rendering.suffixes)) {
                errors.push('Rendering suffixes must be an array')
            }
        }

        // Validate behavior
        if (!config.behavior) {
            errors.push('Behavior configuration is required')
        } else {
            if (!config.behavior.form) {
                errors.push('Form behavior is required')
            }
            if (!config.behavior.validations) {
                errors.push('Validations configuration is required')
            }
            if (!Array.isArray(config.behavior.customValidations)) {
                errors.push('Custom validations must be an array')
            }
            if (!Array.isArray(config.behavior.events)) {
                errors.push('Events must be an array')
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        }
    }

    /**
     * Gets the default configuration with proper regex objects
     * @returns Default configuration object
     */
    this.getDefaultConfiguration = function (): IConfiguration {
        return {
            name: 'default-formular-configuration',
            targetEnvironment: 'development',
            cultures: {
                defaultCulture: {
                    name: 'en-US',
                    dateFormat: 'MM/dd/yyyy',
                    timeFormat: 'hh:mm:ss tt',
                    currencySymbol: '$',
                    separator: '.'
                },
                supportedCultures: [
                    {
                        name: 'en-US',
                        dateFormat: 'MM/dd/yyyy',
                        timeFormat: 'hh:mm:ss tt',
                        currencySymbol: '$',
                        separator: '.'
                    },
                    {
                        name: 'fr-FR',
                        dateFormat: 'dd/MM/yyyy',
                        timeFormat: 'HH:mm:ss',
                        currencySymbol: '€',
                        separator: ','
                    }
                ],
                lokalizeTokensReplacement: [
                    {
                        name: 'validation-required',
                        token: '{{VALIDATION_REQUIRED}}'
                    },
                    {
                        name: 'validation-email',
                        token: '{{VALIDATION_EMAIL}}'
                    }
                ]
            },
            rendering: {
                components: [
                    {
                        name: 'input-text',
                        height: '40px',
                        width: '100%'
                    }
                ],
                commands: [
                    {
                        name: 'submit-button',
                        rounded: true,
                        size: 'medium',
                        width: 'auto',
                        height: '40px',
                        className: 'btn btn-primary'
                    }
                ],
                suffixes: [
                    {
                        name: 'required-indicator',
                        value: '*'
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
                            name: 'on-blur-trigger',
                            triggerDelay: 300
                        }
                    ],
                    patterns: [
                        {
                            name: 'email-pattern',
                            cultureName: 'en-US',
                            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        }
                    ] as IValidationPattern[]
                },
                customValidations: [],
                events: [
                    {
                        name: 'form-load-event',
                        triggerDelay: 0
                    }
                ]
            }
        }
    }

    /**
     * Validates and returns a configuration with defaults merged
     * @param config - Partial configuration to merge with defaults
     * @returns Merged and validated configuration
     */
    this.validateWithDefaults = function (config: Partial<IConfiguration>): {
        isValid: boolean
        errors: string[]
        config: IConfiguration
    } {
        const defaultConfig = this.getDefaultConfiguration()
        const mergedConfig = {
            ...defaultConfig,
            ...config,
            cultures: {
                ...defaultConfig.cultures,
                ...config.cultures
            },
            rendering: {
                ...defaultConfig.rendering,
                ...config.rendering
            },
            behavior: {
                ...defaultConfig.behavior,
                ...config.behavior,
                validations: {
                    ...defaultConfig.behavior.validations,
                    ...config.behavior?.validations
                }
            }
        }

        const validation = this.validate(mergedConfig)

        return {
            ...validation,
            config: mergedConfig
        }
    }
}

export type IConfigurationValidator = {
    validate: (config: any) => { isValid: boolean; errors: string[] }
    getDefaultConfiguration: () => IConfiguration
    validateWithDefaults: (config: Partial<IConfiguration>) => {
        isValid: boolean
        errors: string[]
        config: IConfiguration
    }
}
