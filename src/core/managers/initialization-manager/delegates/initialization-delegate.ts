import { IFieldInitializationParameters } from '@core/field-engine/generator/builder/field-builder'

import { logManager } from '@core/managers/log-manager/log-manager'
import { IInitializationManager } from '../initialization-manager'

export interface IInitializationDelegate {
    new (
        name: string,
        manager: IInitializationManager,
        intitializer: (params: IFieldInitializationParameters) => void
    ): IInitializationDelegate
    name: string
    manager: IInitializationManager
    next?: IInitializationDelegate
    intitializer: (params: IFieldInitializationParameters) => void
    execute?: () => void
    setNextSequence?: (sequenceInitliaizer: IInitializationDelegate) => void
}

export const execute = function (this: IInitializationDelegate) {
    try {
        logManager(undefined, 'info', InitializationDelegate.name, `${this.name} executing...`)
        this?.intitializer?.(this.manager.params)

        this.next?.execute?.()
    } catch (e: any) {
        logManager(
            undefined,
            'info',
            this.name,
            `execution of initialization ${this.name} failed: ${e.message}`
        )
    }
}

export const setNext = function (
    this: IInitializationDelegate,
    initializerDelegate: IInitializationDelegate
) {
    if (!this.next) {
        this.next = initializerDelegate
    } else {
        this.next?.setNextSequence?.(initializerDelegate)
    }
}

export const InitializationDelegate = function (
    this: IInitializationDelegate,
    name: string,
    manager: IInitializationManager,
    intitializer: (params: IFieldInitializationParameters) => void
) {
    this.name = name
    this.manager = manager
    this.next = undefined
    this.intitializer = intitializer
    this.execute = execute
    this.setNextSequence = setNext
} as any as IInitializationDelegate
