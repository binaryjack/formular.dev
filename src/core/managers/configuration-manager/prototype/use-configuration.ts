import { IConfiguration } from '../interfaces/i-configuration'
import { IConfigurationManager } from '../interfaces/i-configuration-manager'

export const useConfiguration = function (
    this: IConfigurationManager,
    name: string
): IConfiguration | undefined {
    // Find the configuration with the specified name
    const configuration = this.configurations.find((c) => c.name === name)

    if (configuration) {
        // Set it as the active configuration
        this.activeConfiguration = configuration
        return configuration
    }

    return undefined
}
