import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { IConfiguration } from './interfaces/i-configuration'
import { IConfigurationManager } from './interfaces/i-configuration-manager'
import {
    getConfigByName,
    loadJson,
    printConfiguration,
    setConfiguration,
    useConfiguration
} from './prototype'

/**
 * Configuration Manager implementation following prototype pattern
 * Manages application configurations and provides methods to load, store, and retrieve configuration data
 */
export const ConfigurationManager = function (this: IConfigurationManager, sm: IServiceManager) {
    this.sm = sm
    this.configurations = []
    this.activeConfiguration = {} as IConfiguration
} as any as new (sm: IServiceManager) => IConfigurationManager

// Attach prototype methods
Object.assign(ConfigurationManager.prototype, {
    getConfigByName,
    setConfiguration,
    useConfiguration,
    loadJson,
    printConfiguration
})
