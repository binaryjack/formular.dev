import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IParserStrategy,
    IValueManager,
    SValueManager
} from '@core/managers/value-manager/value-manager.types'

export const SValueStrategyService = Symbol.for('IValueStrategyService')

export interface IValueStrategyService {
    new (sm: IServiceManager): IValueStrategyService
    strategies: IParserStrategy<any>[]
    add: (...strategies: IParserStrategy<any>[]) => void
    remove: (...strategies: IParserStrategy<any>[]) => void
    reset: () => void
    sync: () => void
}

export const ValueStrategyService = function (this: IValueStrategyService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    let _strategies: IParserStrategy<any>[] | undefined = []
    Object.defineProperties(this, {
        strategies: {
            value: [],
            get: function () {
                return _strategies
            },
            set: function (...strategies: IParserStrategy<any>[]) {
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

    this.sync = function (this: IValueStrategyService) {
        const vm = sm.resolve<IValueManager>(SValueManager)
        if (vm) {
            vm.acceptValueStrategies(...this.strategies)
        }
    }

    // Register the base input service with the service manager
} as any as IValueStrategyService

Object.assign(ValueStrategyService.prototype, {
    add: function (this: IValueStrategyService, ...strategies: IParserStrategy<any>[]) {
        for (const strategy of strategies) {
            if (!this.strategies.includes(strategy)) {
                this.strategies.push(strategy)
            }
        }
        this.sync()
    },

    remove: function (this: IValueStrategyService, ...strategies: IParserStrategy<any>[]) {
        for (const strategy of strategies) {
            const index = this.strategies.indexOf(strategy)
            if (index !== -1) {
                this.strategies.splice(index, 1)
            }
        }
        this.sync()
    },

    reset: function (this: IValueStrategyService) {
        this.strategies = []
        this.sync()
    }
})
