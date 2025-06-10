import { IBuilderService } from '@core/factories/input-factory/input-factory'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import {
    IClickBaseInput,
    SClickBaseInput
} from '@core/input-engine/variants/click-base/click-base-input.types'
import {
    IOptionBaseInput,
    SOptionBaseInput
} from '@core/input-engine/variants/option-based/option-base-input.types'
import {
    IRadioBaseInput,
    SRadioBaseInput
} from '@core/input-engine/variants/radio-base/radio-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

import { IConfigProvider, SConfigProvider } from '@project/provider/configuration/config-provider'
import { baseDependencyList } from '@project/provider/configuration/dependency.list.settings'
import { IBaseInputService, SBaseInputService } from './base-input-service'

export const SRadioInputService = Symbol.for('IRadioInputService')

export interface IRadioInputService extends IBuilderService<IRadioBaseInput> {
    new (sm: IServiceManager): IRadioInputService
    // Define the methods and properties for the base input service
    // For example:
    build: (descriptor: IFieldDescriptor) => IRadioBaseInput
}

export const RadioInputService = function (this: IRadioInputService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    this.sm = sm
    try {
        this.build = function (descriptor: IFieldDescriptor): IRadioBaseInput {
            const baseInputService = this.sm.resolve<IBaseInputService>(SBaseInputService)
            const _baseInput = baseInputService.build(descriptor)
            const _clickInput = this.sm.resolve<IClickBaseInput>(SClickBaseInput)
            const _optionInput = this.sm.resolve<IOptionBaseInput>(
                SOptionBaseInput,
                descriptor.options
            )
            const _radioInput = this.sm.resolve<IRadioBaseInput>(SRadioBaseInput)

            _clickInput.input = _baseInput
            _optionInput.input = _baseInput
            _radioInput.input = _baseInput
            _radioInput.clickBase = _clickInput
            _radioInput.optionBase = _optionInput

            const dependencies = baseDependencyList(
                _baseInput,
                _clickInput,
                _optionInput,
                _radioInput
            )

            const configProvider = this.sm.resolve<IConfigProvider>(SConfigProvider)
            const config = configProvider.getConfig()
            sequenceInitializer(config, dependencies)
            return _radioInput
        }
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            RadioInputService.name,
            `an error has occured when initializing ${RadioInputService.name} class: ${e.message}`
        )
        return undefined
    }
    // Register the base input service with the service manager
} as any as IRadioInputService
