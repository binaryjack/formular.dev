import { EventsType } from '@core/framework/events/events.types'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IValidationManager,
    SValidationManager
} from '@core/managers/validation-manager/validation-manager.types'

export const SIValidationTriggerService = Symbol.for('IValidationTriggerService')

export interface IValidationTriggerService {
    new (sm: IServiceManager): IValidationTriggerService
    triggers: EventsType[]
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
            set: function (...triggers: EventsType[]) {
                for (const trigger of triggers) {
                    if (!_triggers.includes(trigger)) {
                        _triggers.push(trigger)
                    }
                }
            },
            writable: false,
            enumerable: true
        }
    })

    this.sync = function (this: IValidationTriggerService) {
        const vm = sm.resolve<IValidationManager>(SValidationManager)
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
        for (const trigger of triggers) {
            if (!this.triggers.includes(trigger)) {
                this.triggers.push(trigger)
            }
        }
        this.sync()
    },
    remove: function (this: IValidationTriggerService, ...triggers: EventsType[]): void {
        for (const trigger of triggers) {
            const index = this.triggers.indexOf(trigger)
            if (index !== -1) {
                this.triggers.splice(index, 1)
            }
        }
        this.sync()
    },
    reset: function (this: IValidationTriggerService) {
        this.triggers = []
        this.sync()
    }
})
