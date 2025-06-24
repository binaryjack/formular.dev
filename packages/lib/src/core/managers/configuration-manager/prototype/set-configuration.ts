import { IConfiguration } from '../interfaces/i-configuration'
import { IConfigurationManager } from '../interfaces/i-configuration-manager'

export const setConfiguration = function (
    this: IConfigurationManager,
    name: string,
    config: IConfiguration
): void {
    // Ensure the configuration has the correct name
    config.name = name

    // Check if a configuration with this name already exists
    const existingIndex = this.configurations.findIndex((c) => c.name === name)

    if (existingIndex >= 0) {
        // Replace the existing configuration
        this.configurations[existingIndex] = config
    } else {
        // Add the new configuration
        this.configurations.push(config)
    }
}
