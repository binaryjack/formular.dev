import { IManagerFactoryConfig } from '../../interfaces/i-manager-factory-config'
import { IWebComponentManagers } from '../../interfaces/i-web-component-managers'

/**
 * Configure managers based on provided configuration
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const configureManagers = function(this: any, managers: IWebComponentManagers, config: IManagerFactoryConfig): void {
    // Configure managers based on config
    if (config.enableDebugMode) {
        if (managers.notificationManager.setGlobalDebugMode) {
            managers.notificationManager.setGlobalDebugMode(true)
        }
    }

    if (config.batchUpdateDelay && managers.reactiveManager.batchConfig) {
        managers.reactiveManager.batchConfig.debounceTime = config.batchUpdateDelay
    }
}
