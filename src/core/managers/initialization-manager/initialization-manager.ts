import { IConfiguration } from 'src/environment/provider/configuration/i-configuration'
import {
    IInitializationDelegate,
    InitializationDelegate
} from './delegates/initialization-delegate'

export interface IInitializationManager {
    new (params: IConfiguration): IInitializationManager
    params: IConfiguration
    initializer?: IInitializationDelegate
    addInitializer: (name: string, initializer: (params: IConfiguration) => void) => void
    executeSequences: () => void
}

export const addInitializer = function (
    this: IInitializationManager,
    name: string,
    initializer: (params: IConfiguration) => void
) {
    const newDelegate = new InitializationDelegate(name, this, initializer)

    if (!this.initializer) {
        this.initializer = newDelegate
    } else {
        this.initializer?.setNextSequence?.(newDelegate)
    }
}

export const executeSequences = function (this: IInitializationManager) {
    this.initializer?.execute?.()
}

export const InitializationManager = function (
    this: IInitializationManager,
    params: IConfiguration
) {
    this.params = params
    this.initializer = undefined
    this.addInitializer = addInitializer
    this.executeSequences = executeSequences
} as any as IInitializationManager
