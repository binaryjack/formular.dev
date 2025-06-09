import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import {
    IClickBaseInput,
    SClickBaseInput
} from '@core/input-engine/variants/click-base/click-base-input.types'
import {
    IOptionBaseInput,
    SOptionBaseInput
} from '@core/input-engine/variants/option-based/option-base-input.types'
import { baseDependencyList } from 'src/environment/provider/configuration/dependency.list.settings'

import { IBuilderService } from '@core/factories/input-factory/input-factory'
import {
    ISelectBaseInput,
    SSelectBaseInput
} from '@core/input-engine/variants/select-base/select-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IConfigProvider,
    SConfigProvider
} from '../../../environment/provider/configuration/config-provider'
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
    try {
        this.build = function (descriptor: IFieldDescriptor): ISelectBaseInput {
            const baseInputService = sm.resolve<IBaseInputService>(SBaseInputService)
            const _baseInput = baseInputService.build(descriptor)
            const _clickInput = sm.resolve<IClickBaseInput>(SClickBaseInput)
            const _optionInput = sm.resolve<IOptionBaseInput>(SOptionBaseInput)
            const _selectInput = sm.resolve<ISelectBaseInput>(SSelectBaseInput)

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

            const configProvider = sm.resolve<IConfigProvider>(SConfigProvider)
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
