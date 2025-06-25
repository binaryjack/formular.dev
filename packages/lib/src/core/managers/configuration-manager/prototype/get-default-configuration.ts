import { defaultConfiguration } from '../default/default-configuration'
import { IConfiguration } from '../interfaces/i-configuration'
import { IConfigurationManager } from '../interfaces/i-configuration-manager'

/**
 * Gets the default configuration object
 * @returns The default configuration
 */
export function getDefaultConfiguration(this: IConfigurationManager): IConfiguration {
    return { ...defaultConfiguration }
}
