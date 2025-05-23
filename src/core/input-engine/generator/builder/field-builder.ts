import { EventsType } from '@core/framework/events/events.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { ICheckBoxBaseInput } from '@core/input-engine/variants/check-box-base/check-box-base-input.types'
import { IClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input.types'
import { IMaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input.types'
import { IOptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input.types'
import { IRadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input.types'
import { ISelectBaseInput } from '@core/input-engine/variants/select-base/select-base-input.types'
import { ITextBaseInput } from '@core/input-engine/variants/text-base/text-base-input.types'
import { ITrackingOutputProvider } from '@core/managers/tracking-manager/tracker-manager.types'
import { IValidationMethodStrategy } from '@core/managers/validation-manager/validation-manager.types'
import { IParserStrategy } from '@core/managers/value-manager/value-manager.types'
import { createCheckBased } from './prototype/create-check-based'
import { createClickBased } from './prototype/create-click-based'
import { createBaseInput } from './prototype/create-input-base'
import { createMaskedBased } from './prototype/create-masked-based'
import { createOptionBased } from './prototype/create-option-based'
import { createRadioBased } from './prototype/create-radio-based'
import { createSelectBased } from './prototype/create-select-based'
import { createTextBased } from './prototype/create-text-based'

export interface IFieldInitializationParameters {
    [key: string]: any
    descriptor: IFieldDescriptor
    validationStrategies: IValidationMethodStrategy[]
    trackingStrategies: ITrackingOutputProvider[]
    valueStrategies: IParserStrategy<any>[]
    validationTriggerModeType: EventsType[]
}

export type IBuilder<T> = (config: IDependencyConfiguration) => T

export function createField<T>(builderMethod: IBuilder<T>): IBuilder<T> {
    return builderMethod
}

export interface IFieldBuilder {
    new (): IFieldBuilder

    /** concrete */
    createBaseInput: IBuilder<IInputBase>
    createClickBased: IBuilder<IClickBaseInput>
    createOptionBased: IBuilder<IOptionBaseInput>
    createCheckBased: IBuilder<ICheckBoxBaseInput>
    createSelectBased: IBuilder<ISelectBaseInput>
    createRadioBased: IBuilder<IRadioBaseInput>
    createTextBased: IBuilder<ITextBaseInput>
    createMaskedBased: IBuilder<IMaskedBaseInput>
}

export type FieldBuilderConstructor = new () => IFieldBuilder

export const FieldBuilder: FieldBuilderConstructor = function (
    this: IFieldBuilder
) {} as any as IFieldBuilder

Object.assign(FieldBuilder.prototype, {
    createClickBased,
    createOptionBased,
    createCheckBased,
    createSelectBased,
    createRadioBased,
    createTextBased,
    createMaskedBased,
    createBaseInput
})
