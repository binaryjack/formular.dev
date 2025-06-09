import { IBuilderService } from '@core/factories/input-factory/input-factory'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import {
    ICheckBoxBaseInput,
    SCheckBoxBaseInput
} from '@core/input-engine/variants/check-box-base/check-box-base-input.types'
import {
    IClickBaseInput,
    SClickBaseInput
} from '@core/input-engine/variants/click-base/click-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { baseDependencyList } from 'src/environment/provider/configuration/dependency.list.settings'
import {
    IConfigProvider,
    SConfigProvider
} from '../../../environment/provider/configuration/config-provider'
import { IBaseInputService, SBaseInputService } from './base-input-service'

export const SCheckInputService = Symbol.for('ICheckInputService')

export interface ICheckInputService extends IBuilderService<ICheckBoxBaseInput> {
    new (sm: IServiceManager): ICheckInputService
    // Define the methods and properties for the base input service
    // For example:
    build: (descriptor: IFieldDescriptor) => ICheckBoxBaseInput
}

export const CheckInputService = function (this: ICheckInputService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    try {
        this.build = function (descriptor: IFieldDescriptor): ICheckBoxBaseInput {
            const configProvider = sm.resolve<IConfigProvider>(SConfigProvider)
            const config = configProvider.getConfig()

            const baseInputService = sm.resolve<IBaseInputService>(SBaseInputService)
            const _baseInput = baseInputService.build(descriptor)
            const _clickInput = sm.resolve<IClickBaseInput>(SClickBaseInput)
            const _checkInput = sm.resolve<ICheckBoxBaseInput>(SCheckBoxBaseInput)

            _clickInput.input = _baseInput
            _checkInput.input = _baseInput
            _checkInput.clickBase = _clickInput

            const dependencies = baseDependencyList(_baseInput, _clickInput, _checkInput)

            sequenceInitializer(config, dependencies)
            return _checkInput
        }
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            CheckInputService.name,
            `an error has occured when initializing ${CheckInputService.name} class: ${e.message}`
        )
        return undefined
    }
    // Register the base input service with the service manager
} as any as ICheckInputService
