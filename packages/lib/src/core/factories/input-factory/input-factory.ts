import { InputTypeNames } from '@core/framework/common/common.input.types'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

import {
    ICheckInputService,
    SCheckInputService
} from '@core/factories/input-builder-services/check-input-service'
import {
    IRadioInputService,
    SRadioInputService
} from '@core/factories/input-builder-services/radio-input-service'
import {
    ISelectInputService,
    SSelectInputService
} from '@core/factories/input-builder-services/select-input-service'
import {
    ITextInputService,
    STextInputService
} from '@core/factories/input-builder-services/text-input-service'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import {
    IMaskedWithDrawerInputService,
    SMaskedWithDrawerInputService
} from '../input-builder-services'
import { InputTypeMap } from './mapping/input-type-map'

export const SInputFactory = Symbol.for('IInputFactory')

export interface IInputFactory {
    new (serviceManager: IServiceManager): IInputFactory
    sm: IServiceManager
    InputsRegistry: <T>(type: keyof InputTypeMap) => IBuilder<T> | undefined
    create: <T>(type: InputTypeNames) => IBuilder<T>
}

export type IBuilder<T> = (descriptor: IFieldDescriptor) => T

export interface IBuilderService<T> {
    sm: IServiceManager
    build: IBuilder<T>
}

export const InputFactory = function (this: IInputFactory, serviceManager: IServiceManager) {
    this.sm = serviceManager

    this.InputsRegistry = function <T>(
        this: IInputFactory,
        type: keyof InputTypeMap
    ): IBuilder<T> | undefined {
        switch (type) {
            case 'toggle':
            case 'checkbox':
                const cbs = this.sm.lazy<ICheckInputService>(SCheckInputService)?.()
                return cbs.build.bind(cbs) as IBuilder<T>
            case 'select':
                const sis = this.sm.lazy<ISelectInputService>(SSelectInputService)?.()
                return sis.build.bind(sis) as IBuilder<T>
            case 'radio':
                const srs = this.sm.lazy<IRadioInputService>(SRadioInputService)?.()
                return srs.build.bind(srs) as IBuilder<T>
            case 'date':
                const sms = this.sm.lazy<IMaskedWithDrawerInputService>(
                    SMaskedWithDrawerInputService
                )?.()
                return sms.build.bind(sms) as IBuilder<T>
            case 'text':
            default:
                const sts = this.sm.lazy<ITextInputService>(STextInputService)?.()
                return sts.build.bind(sts) as IBuilder<T>
        }
    }

    this.create = function <T>(this: IInputFactory, type: InputTypeNames): IBuilder<T> {
        return this.InputsRegistry<T>(type) as IBuilder<T>
    }
} as any as IInputFactory
