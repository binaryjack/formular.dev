import { logManager } from '@core/managers/log-manager/log-manager'

import { IInputConfiguration } from '@project/providers/interfaces/i-input-configuration'
import { IInitializationManager } from '../initialization-manager.types'

export interface IInitializationDelegate {
    new (
        name: string,
        manager: IInitializationManager,
        intitializer: (params: IInputConfiguration) => void
    ): IInitializationDelegate
    name: string
    manager: IInitializationManager
    next?: IInitializationDelegate
    intitializer: (params: IInputConfiguration) => void
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
    intitializer: (params: IInputConfiguration) => void
) {
    this.name = name
    this.manager = manager
    this.next = undefined
    this.intitializer = intitializer
    this.execute = execute
    this.setNextSequence = setNext
} as any as IInitializationDelegate

