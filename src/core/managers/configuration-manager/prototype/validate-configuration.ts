import { defaultConfiguration } from '../default/default-configuration'
import { IConfiguration } from '../interfaces/i-configuration'
import { IConfigurationManager } from '../interfaces/i-configuration-manager'

/**
 * Validates a configuration object against the required schema
 * @param config - Configuration object to validate
 * @returns Validated configuration with merged defaults
 */
export function validateConfiguration(
    this: IConfigurationManager,
    config: Partial<IConfiguration>
): IConfiguration {
    const errors: string[] = []

    if (!config) {
        console.warn('Configuration is required, using default configuration')
        return defaultConfiguration
    }

    // Validate required top-level properties
    if (config.name && typeof config.name !== 'string') {
        errors.push('Configuration name must be a string')
    }

    if (config.targetEnvironment && typeof config.targetEnvironment !== 'string') {
        errors.push('Target environment must be a string')
    }

    // Validate cultures if provided
    if (config.cultures) {
        if (
            config.cultures.supportedCultures &&
            !Array.isArray(config.cultures.supportedCultures)
        ) {
            errors.push('Supported cultures must be an array')
        }
        if (
            config.cultures.lokalizeTokensReplacement &&
            !Array.isArray(config.cultures.lokalizeTokensReplacement)
        ) {
            errors.push('Lokalize tokens replacement must be an array')
        }
    }

    // Validate rendering if provided
    if (config.rendering) {
        if (config.rendering.components && !Array.isArray(config.rendering.components)) {
            errors.push('Rendering components must be an array')
        }
        if (config.rendering.commands && !Array.isArray(config.rendering.commands)) {
            errors.push('Rendering commands must be an array')
        }
        if (config.rendering.suffixes && !Array.isArray(config.rendering.suffixes)) {
            errors.push('Rendering suffixes must be an array')
        }
    }

    // Validate behavior if provided
    if (config.behavior) {
        if (
            config.behavior.customValidations &&
            !Array.isArray(config.behavior.customValidations)
        ) {
            errors.push('Custom validations must be an array')
        }
        if (config.behavior.events && !Array.isArray(config.behavior.events)) {
            errors.push('Events must be an array')
        }
    }

    if (errors.length > 0) {
        console.warn('Configuration validation warnings:', errors)
    }

    // Merge with defaults and return
    return this.mergeConfigurationWithDefaults(config)
}
