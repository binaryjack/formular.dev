import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import {
    IClickBaseInput,
    SClickBaseInput
} from '@core/input-engine/variants/click-base/click-base-input.types'
import {
    IOptionBaseInput,
    SOptionBaseInput
} from '@core/input-engine/variants/option-based/option-base-input.types'

import { IBuilderService } from '@core/factories/input-factory/input-factory'
import {
    ISelectBaseInput,
    SSelectBaseInput
} from '@core/input-engine/variants/select-base/select-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

import { baseDependencyList } from '@project/providers/configuration/base-dependency/dependency.list.settings'
import {
    IInputConfigProvider,
    SInputConfigProvider
} from '@project/providers/configuration/input-configuration/input-config-provider'
import { IBaseInputService, SBaseInputService } from './base-input-service'

export const SSelectInputService = Symbol.for('ISelectInputService')

export interface ISelectInputService extends IBuilderService<ISelectBaseInput> {
    new (sm: IServiceManager): ISelectInputService
    // Define the methods and properties for the base input service
    // For example:
    build: (descriptor: IFieldDescriptor) => ISelectBaseInput
}

export const SelectInputService = function (this: ISelectInputService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    this.sm = sm
    try {
        this.build = function (descriptor: IFieldDescriptor): ISelectBaseInput {
            const baseInputService = this.sm.lazy<IBaseInputService>(SBaseInputService)?.()
            const _baseInput = baseInputService.build(descriptor)
            const _clickInput = this.sm.lazy<IClickBaseInput>(SClickBaseInput)?.()
            const _optionInput = this.sm.lazy<IOptionBaseInput>(SOptionBaseInput)?.()
            const _selectInput = this.sm.lazy<ISelectBaseInput>(SSelectBaseInput)?.()

            _clickInput.input = _baseInput
            _optionInput.input = _baseInput
            _selectInput.input = _baseInput
            _selectInput.clickBase = _clickInput
            _selectInput.optionBase = _optionInput

            const dependencies = baseDependencyList(
                _baseInput,
                _clickInput,
                _optionInput,
                _selectInput
            )

            const configProvider = this.sm.lazy<IInputConfigProvider>(SInputConfigProvider)?.()
            const config = configProvider.getConfig()
            sequenceInitializer(config, dependencies)
            return _selectInput
        }
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            SelectInputService.name,
            `an error has occured when initializing ${SelectInputService.name} class: ${e.message}`
        )
        return undefined
    }
    // Register the base input service with the service manager
} as any as ISelectInputService

