import { EventsType } from '@core/framework/events/events.types'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IValidationManager,
    SValidationManager
} from '@core/managers/validation-manager/validation-manager.types'

export const SValidationTriggerService = Symbol.for('IValidationTriggerService')

export interface IValidationTriggerService {
    new (sm: IServiceManager): IValidationTriggerService
    triggers: EventsType[]
    sm: IServiceManager
    canTrigger: (...triggers: EventsType[]) => boolean
    add: (...triggers: EventsType[]) => void
    remove: (...triggers: EventsType[]) => void
    reset: () => void
    sync: () => void
}

export const ValidationTriggerService = function (
    this: IValidationTriggerService,
    sm: IServiceManager
) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    let _triggers: EventsType[] = []
    Object.defineProperties(this, {
        triggers: {
            get: function () {
                return _triggers
            },
            set: function (triggers: EventsType[]) {
                _triggers = triggers || []
            },
            enumerable: true,
            configurable: false
        }
    })
    this.sm = sm
    this.sync = function (this: IValidationTriggerService) {
        const vm = this.sm.lazy<IValidationManager>(SValidationManager)?.()
        if (vm) {
            vm.setTriggerKeyWord(this.triggers)
        }
    }
    // Register the base input service with the service manager
} as any as IValidationTriggerService

Object.assign(ValidationTriggerService.prototype, {
    canTrigger: function (this: IValidationTriggerService, ...triggers: EventsType[]): boolean {
        for (const trigger of triggers) {
            if (this.triggers.includes(trigger)) {
                return true
            }
        }
        return false
    },

    add: function (this: IValidationTriggerService, ...triggers: EventsType[]): void {
        const currentTriggers = [...this.triggers]
        for (const trigger of triggers) {
            if (!currentTriggers.includes(trigger)) {
                currentTriggers.push(trigger)
            }
        }
        this.triggers = currentTriggers
        this.sync()
    },
    remove: function (this: IValidationTriggerService, ...triggers: EventsType[]): void {
        let currentTriggers = [...this.triggers]
        for (const trigger of triggers) {
            // Remove all occurrences of the trigger
            currentTriggers = currentTriggers.filter((t) => t !== trigger)
        }
        this.triggers = currentTriggers
        this.sync()
    },
    reset: function (this: IValidationTriggerService) {
        this.triggers = []
        this.sync()
    }
})
