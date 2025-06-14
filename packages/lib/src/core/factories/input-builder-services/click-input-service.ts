import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

import { IBuilderService } from '@core/factories/input-factory/input-factory'
import {
    IClickBaseInput,
    SClickBaseInput
} from '@core/input-engine/variants/click-base/click-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

import { IConfigProvider, SConfigProvider } from '@project/provider/configuration/config-provider'
import { baseDependencyList } from '@project/provider/configuration/dependency.list.settings'
import { IBaseInputService, SBaseInputService } from './base-input-service'

export const SClickInputService = Symbol.for('IClickInputService')

export interface IClickInputService extends IBuilderService<IClickBaseInput> {
    new (sm: IServiceManager): IClickInputService
    // Define the methods and properties for the base input service
    // For example:
    build: (descriptor: IFieldDescriptor) => IClickBaseInput
}

export const ClickInputService = function (this: IClickInputService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    this.sm = sm
    try {
        this.build = function (descriptor: IFieldDescriptor): IClickBaseInput {
            const configProvider = this.sm.lazy<IConfigProvider>(SConfigProvider)?.()
            const config = configProvider.getConfig()
            const baseInputService = this.sm.lazy<IBaseInputService>(SBaseInputService)?.()
            const _baseInput = baseInputService.build(descriptor)
            const _clickInput = this.sm.lazy<IClickBaseInput>(SClickBaseInput)?.()
            _clickInput.input = _baseInput
            const dependencies = baseDependencyList(_baseInput, _clickInput)

            sequenceInitializer(config, dependencies)
            return _clickInput
        }
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            ClickInputService.name,
            `an error has occured when initializing ${ClickInputService.name} class: ${e.message}`
        )
        return undefined
    }
    // Register the base input service with the service manager
} as any as IClickInputService
