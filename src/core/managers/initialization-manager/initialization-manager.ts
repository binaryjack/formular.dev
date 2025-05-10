import { IFieldInitializationParameters } from '@core/field-engine/generator/builder/field-builder'
import {
    IInitializationDelegate,
    InitializationDelegate
} from './delegates/initialization-delegate'

export interface IInitializationManager {
    new (params: IFieldInitializationParameters): IInitializationManager
    params: IFieldInitializationParameters
    initializer?: IInitializationDelegate
    addInitializer: (
        name: string,
        initializer: (params: IFieldInitializationParameters) => void
    ) => void
    executeSequences: () => void
}

export const addInitializer = function (
    this: IInitializationManager,
    name: string,
    initializer: (params: IFieldInitializationParameters) => void
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
    params: IFieldInitializationParameters
) {
    this.params = params
    this.initializer = undefined
    this.addInitializer = addInitializer
    this.executeSequences = executeSequences
} as any as IInitializationManager
