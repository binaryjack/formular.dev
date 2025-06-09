import { IBuilderService } from '@core/factories/input-factory/input-factory'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import {
    ITextBaseInput,
    STextBaseInput
} from '@core/input-engine/variants/text-base/text-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { baseDependencyList } from 'src/environment/provider/configuration/dependency.list.settings'
import {
    IConfigProvider,
    SConfigProvider
} from '../../../environment/provider/configuration/config-provider'
import { IBaseInputService, SBaseInputService } from './base-input-service'

export const STextInputService = Symbol.for('ITextInputService')

export interface ITextInputService extends IBuilderService<ITextBaseInput> {
    new (sm: IServiceManager): ITextInputService
    // Define the methods and properties for the base input service
    // For example:
    build: (descriptor: IFieldDescriptor) => ITextBaseInput
}

export const TextInputService = function (this: ITextInputService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    try {
        this.build = function (descriptor: IFieldDescriptor): ITextBaseInput {
            const baseInputService = sm.resolve<IBaseInputService>(SBaseInputService)
            const _baseInput = baseInputService.build(descriptor)
            const _textInput = sm.resolve<ITextBaseInput>(STextBaseInput)
            _textInput.input = _baseInput
            const dependencies = baseDependencyList(_baseInput, _textInput)

            const configProvider = sm.resolve<IConfigProvider>(SConfigProvider)
            const config = configProvider.getConfig()
            sequenceInitializer(config, dependencies)
            return _textInput
        }
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            TextInputService.name,
            `an error has occured when initializing ${TextInputService.name} class: ${e.message}`
        )
        return undefined
    }
    // Register the base input service with the service manager
} as any as ITextInputService
