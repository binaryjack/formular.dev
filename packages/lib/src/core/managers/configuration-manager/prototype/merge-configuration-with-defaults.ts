import { defaultConfiguration } from '../default/default-configuration'
import { IConfiguration } from '../interfaces/i-configuration'
import { IConfigurationManager } from '../interfaces/i-configuration-manager'

/**
 * Merges a partial configuration with the default configuration
 * @param config - Partial configuration to merge with defaults
 * @returns Complete configuration with defaults applied
 */
export function mergeConfigurationWithDefaults(
    this: IConfigurationManager,
    config: Partial<IConfiguration>
): IConfiguration {
    const mergedConfig: IConfiguration = {
        ...defaultConfiguration,
        ...config,
        cultures: {
            ...defaultConfiguration.cultures,
            ...config.cultures,
            supportedCultures:
                config.cultures?.supportedCultures ||
                defaultConfiguration.cultures.supportedCultures,
            lokalizeTokensReplacement:
                config.cultures?.lokalizeTokensReplacement ||
                defaultConfiguration.cultures.lokalizeTokensReplacement
        },
        rendering: {
            ...defaultConfiguration.rendering,
            ...config.rendering,
            components: config.rendering?.components || defaultConfiguration.rendering.components,
            commands: config.rendering?.commands || defaultConfiguration.rendering.commands,
            suffixes: config.rendering?.suffixes || defaultConfiguration.rendering.suffixes
        },
        behavior: {
            ...defaultConfiguration.behavior,
            ...config.behavior,
            form: {
                ...defaultConfiguration.behavior.form,
                ...config.behavior?.form
            },
            validations: {
                ...defaultConfiguration.behavior.validations,
                ...config.behavior?.validations,
                triggers:
                    config.behavior?.validations?.triggers ||
                    defaultConfiguration.behavior.validations.triggers,
                patterns:
                    config.behavior?.validations?.patterns ||
                    defaultConfiguration.behavior.validations.patterns
            },
            customValidations:
                config.behavior?.customValidations ||
                defaultConfiguration.behavior.customValidations,
            events: config.behavior?.events || defaultConfiguration.behavior.events
        }
    }

    return mergedConfig
}
