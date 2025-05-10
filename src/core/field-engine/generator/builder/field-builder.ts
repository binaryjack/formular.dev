import { IDependencyConfiguration } from '@core/field-engine/core/input-base/configuration/dependency-configuration'
import { IFieldBaseInput } from '@core/field-engine/core/input-base/field-input-base-types'
import { ICheckBoxBaseInput } from '@core/field-engine/variants/check-box-base/check-box-base-input.types'
import { IClickBaseInput } from '@core/field-engine/variants/click-base/click-base-input.types'
import { IOptionBaseInput } from '@core/field-engine/variants/option-based/option-base-input.types'
import { IRadioBaseInput } from '@core/field-engine/variants/radio-base/radio-base-input.types'
import { ISelectBaseInput } from '@core/field-engine/variants/select-base/select-base-input.types'
import { ITextBaseInput } from '@core/field-engine/variants/text-base/text-base-input.types'
import { EventsType } from '@core/framework/events/events.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { ITrackingOutputProvider } from '@core/managers/tracking-manager/tracker-manager.types'
import { IValidationMethodStrategy } from '@core/managers/validation-manager/validation-manager.types'
import { IParserStrategy } from '@core/managers/value-manager/value-manager.types'
import { createCheckBased } from './prototype/create-check-based'
import { createClickBased } from './prototype/create-click-based'
import { createBaseInput } from './prototype/create-input-base'
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
    createBaseInput: IBuilder<IFieldBaseInput>
    createClickBased: IBuilder<IClickBaseInput>
    createOptionBased: IBuilder<IOptionBaseInput>
    createCheckBased: IBuilder<ICheckBoxBaseInput>
    createSelectBased: IBuilder<ISelectBaseInput>
    createRadioBased: IBuilder<IRadioBaseInput>
    createTextBased: IBuilder<ITextBaseInput>
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
    createBaseInput
})
