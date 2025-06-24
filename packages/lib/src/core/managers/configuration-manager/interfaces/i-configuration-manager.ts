import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { IConfiguration } from './i-configuration'

export interface IConfigurationManager {
    new (sm: IServiceManager): IConfigurationManager
    sm: IServiceManager
    configurations: IConfiguration[]
    activeConfiguration: IConfiguration
    /** This function must search for configuration following the path
     *  the very last element provided is the name of the configuration (all coniguration has name property)
     *  BUT! take care to determine if the container is an array or an object.
     *  If it is an array, the search should be done by find(o => o.name === lastElement) .
     *  if it is an object the search should be done by Object.keys(configurationLastItemButOne).find(o => o[lastElement] === true)
     *  the search must be done from the activeConfiguration property
     */
    getConfigByName<T>(...names: string[]): T | undefined
    /**
     * This function is used to add a configuration to the collection of configurations
     * @param name
     * @param config
     */
    setConfiguration(name: string, config: IConfiguration): void
    /**
     * This function must be issued after loading a config file. to determine which will be the active session configuration
     * @param name
     * @param config
     */
    useConfiguration(name: string): IConfiguration | undefined
    /**
     * This functon is used to load a json from a path
     * @param path
     * @returns Promise that resolves when the configuration is loaded
     */
    loadJson: (path: string) => Promise<void>
    /**
     * this function list all defined configuration into the console.table
     * it's used to have a quick view over the defined configurations
     *
     * Format: | name | target environment | is Active |  JSON configuration |
     * @returns
     */
    printConfiguration: () => void
}
