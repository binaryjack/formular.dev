import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IValidationManager,
    IValidationMethodStrategy,
    SValidationManager
} from '@core/managers/validation-manager/validation-manager.types'

export const SValidationStrategyService = Symbol.for('IValidationStrategyService')

export interface IValidationStrategyService {
    new (sm: IServiceManager): IValidationStrategyService
    strategies: IValidationMethodStrategy[]
    add: (...strategies: IValidationMethodStrategy[]) => void
    remove: (...strategies: IValidationMethodStrategy[]) => void
    reset: () => void
    sync: () => void
}

export const ValidationStrategyService = function (
    this: IValidationStrategyService,
    sm: IServiceManager
) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    let _strategies: IValidationMethodStrategy[] | undefined = []
    Object.defineProperties(this, {
        strategies: {
            value: [],
            get: function () {
                return _strategies
            },
            set: function (...strategies: IValidationMethodStrategy[]) {
                for (const strategy of strategies) {
                    if (!_strategies.includes(strategy)) {
                        _strategies.push(strategy)
                    }
                }
                this.sync()
            },
            writable: false,
            enumerable: true
        }
    })

    this.sync = function (this: IValidationStrategyService) {
        const vm = sm.resolve<IValidationManager>(SValidationManager)
        if (vm) {
            vm.addValidationStrategies(...this.strategies)
        }
    }

    // Register the base input service with the service manager
} as any as IValidationStrategyService

Object.assign(ValidationStrategyService.prototype, {
    add: function (this: IValidationStrategyService, ...strategies: IValidationMethodStrategy[]) {
        for (const strategy of strategies) {
            if (!this.strategies.includes(strategy)) {
                this.strategies.push(strategy)
            }
        }
        this.sync()
    },

    remove: function (
        this: IValidationStrategyService,
        ...strategies: IValidationMethodStrategy[]
    ) {
        for (const strategy of strategies) {
            const index = this.strategies.indexOf(strategy)
            if (index !== -1) {
                this.strategies.splice(index, 1)
            }
        }
        this.sync()
    },

    reset: function (this: IValidationStrategyService) {
        this.strategies = []
        this.sync()
    }
})
