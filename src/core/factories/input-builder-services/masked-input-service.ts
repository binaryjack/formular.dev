import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { baseDependencyList } from 'src/environment/provider/configuration/dependency.list.settings'

import { IBuilderService } from '@core/factories/input-factory/input-factory'
import {
    IMaskedBaseInput,
    SMaskedBaseInput
} from '@core/input-engine/variants/masked-base/masked-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IConfigProvider,
    SConfigProvider
} from '../../../environment/provider/configuration/config-provider'
import { IBaseInputService, SBaseInputService } from './base-input-service'

export const SMaskedInputService = Symbol.for('IMaskedInputService')

export interface IMaskedInputService extends IBuilderService<IMaskedBaseInput> {
    new (sm: IServiceManager): IMaskedInputService
    // Define the methods and properties for the base input service
    // For example:
    build: (descriptor: IFieldDescriptor) => IMaskedBaseInput
}

export const MaskedInputService = function (this: IMaskedInputService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    try {
        this.build = function (descriptor: IFieldDescriptor): IMaskedBaseInput {
            const configProvider = sm.resolve<IConfigProvider>(SConfigProvider)
            const config = configProvider.getConfig()

            const baseInputService = sm.resolve<IBaseInputService>(SBaseInputService)
            const _baseInput = baseInputService.build(descriptor)
            const _maskedInput = sm.resolve<IMaskedBaseInput>(SMaskedBaseInput, descriptor.mask)
            _maskedInput.input = _baseInput
            const dependencies = baseDependencyList(_baseInput, _maskedInput)

            sequenceInitializer(config, dependencies)
            return _maskedInput
        }
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            MaskedInputService.name,
            `an error has occured when initializing ${MaskedInputService.name} class: ${e.message}`
        )
        return undefined
    }
    // Register the base input service with the service manager
} as any as IMaskedInputService
