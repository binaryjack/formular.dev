import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

import { IBuilderService } from '@core/factories/input-factory/input-factory'
import {
    IOptionBaseInput,
    SOptionBaseInput
} from '@core/input-engine/variants/option-based/option-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

import { IConfigProvider, SConfigProvider } from '@project/provider/configuration/config-provider'
import { baseDependencyList } from '@project/provider/configuration/dependency.list.settings'
import { IBaseInputService, SBaseInputService } from './base-input-service'

export const SOptionInputService = Symbol.for('IOptionInputService')

export interface IOptionInputService extends IBuilderService<IOptionBaseInput> {
    new (sm: IServiceManager): IOptionInputService
    // Define the methods and properties for the base input service
    // For example:
    build: (descriptor: IFieldDescriptor) => IOptionBaseInput
}

export const OptionInputService = function (this: IOptionInputService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    this.sm = sm
    try {
        this.build = function (descriptor: IFieldDescriptor): IOptionBaseInput {
            const baseInputService = this.sm.lazy<IBaseInputService>(SBaseInputService)?.()
            const _baseInput = baseInputService.build(descriptor)
            const _optionInput = this.sm.lazy<IOptionBaseInput>(
                SOptionBaseInput,
                descriptor.options
            )?.()
            _optionInput.input = _baseInput
            const dependencies = baseDependencyList(_baseInput, _optionInput)

            const configProvider = this.sm.lazy<IConfigProvider>(SConfigProvider)?.()
            const config = configProvider.getConfig()
            sequenceInitializer(config, dependencies)
            return _optionInput
        }
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            OptionInputService.name,
            `an error has occured when initializing ${OptionInputService.name} class: ${e.message}`
        )
        return undefined
    }
    // Register the base input service with the service manager
} as any as IOptionInputService
