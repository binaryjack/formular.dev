import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    ITrackingManager,
    ITrackingOutputProvider,
    STrackingManager
} from '@core/managers/tracking-manager/tracker-manager.types'

export const STrackingStrategyService = Symbol.for('ITrackingStrategyService')

export interface ITrackingStrategyService {
    new (sm: IServiceManager): ITrackingStrategyService
    strategies: ITrackingOutputProvider[]
    add: (...strategies: ITrackingOutputProvider[]) => void
    remove: (...strategies: ITrackingOutputProvider[]) => void
    reset: () => void
    sync: () => void
}

export const TrackingStrategyService = function (
    this: ITrackingStrategyService,
    sm: IServiceManager
) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    let _strategies: ITrackingOutputProvider[] | undefined = []
    Object.defineProperties(this, {
        strategies: {
            value: [],
            get: function () {
                return _strategies
            },
            set: function (...strategies: ITrackingOutputProvider[]) {
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

    this.sync = function (this: ITrackingStrategyService) {
        const vm = sm.resolve<ITrackingManager>(STrackingManager)
        if (vm) {
            vm.addProviders(this.strategies)
        }
    }

    // Register the base input service with the service manager
} as any as ITrackingStrategyService

Object.assign(TrackingStrategyService.prototype, {
    add: function (this: ITrackingStrategyService, ...strategies: ITrackingOutputProvider[]) {
        for (const strategy of strategies) {
            if (!this.strategies.includes(strategy)) {
                this.strategies.push(strategy)
            }
        }
        this.sync()
    },

    remove: function (this: ITrackingStrategyService, ...strategies: ITrackingOutputProvider[]) {
        for (const strategy of strategies) {
            const index = this.strategies.indexOf(strategy)
            if (index !== -1) {
                this.strategies.splice(index, 1)
            }
        }
        this.sync()
    },

    reset: function (this: ITrackingStrategyService) {
        this.strategies = []
        this.sync()
    }
})
