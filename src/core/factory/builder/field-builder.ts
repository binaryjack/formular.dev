import { ICheckBoxBaseInput } from '@core/fields/check-box-base-input/check-box-base-input.types'
import { IClickBaseInput } from '@core/fields/click-base-input/click-base-input.types'
import { IFieldBaseInput } from '@core/fields/field-base-input/field-input-base-types'
import { IOptionBaseInput } from '@core/fields/option-based-input/option-base-input.types'
import { IRadioBaseInput } from '@core/fields/radio-base-input/radio-base-input.types'
import { ISelectBaseInput } from '@core/fields/select-base-input/select-base-input.types'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { ITrackingOutputProvider } from '@core/tracker/tracker.types'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { createCheckBased } from './prototype/create-check-based'
import { createClickBased } from './prototype/create-click-based'
import { createOptionBased } from './prototype/create-option-based'
import { createRadioBased } from './prototype/create-radio-based'
import { createSelectBased } from './prototype/create-select-based'
import { createTextBased } from './prototype/create-text-based'

export interface IFieldBuilder {
    new (): IFieldBuilder

    /** concrete */
    createClickBased: (
        descriptor: IFieldDescriptor,
        validationStrategies: IValidationMethodStrategy[],
        trackingStrategies: ITrackingOutputProvider[],
        valueStrategies: IParserStrategy<any>[]
    ) => IClickBaseInput | undefined
    createOptionBased: (
        descriptor: IFieldDescriptor,
        validationStrategies: IValidationMethodStrategy[],
        trackingStrategies: ITrackingOutputProvider[],
        valueStrategies: IParserStrategy<any>[]
    ) => IOptionBaseInput | undefined
    createCheckBased: (
        descriptor: IFieldDescriptor,
        validationStrategies: IValidationMethodStrategy[],
        trackingStrategies: ITrackingOutputProvider[],
        valueStrategies: IParserStrategy<any>[]
    ) => ICheckBoxBaseInput | undefined
    createSelectBased: (
        descriptor: IFieldDescriptor,
        validationStrategies: IValidationMethodStrategy[],
        trackingStrategies: ITrackingOutputProvider[],
        valueStrategies: IParserStrategy<any>[]
    ) => ISelectBaseInput | undefined
    createRadioBased: (
        descriptor: IFieldDescriptor,
        validationStrategies: IValidationMethodStrategy[],
        trackingStrategies: ITrackingOutputProvider[],
        valueStrategies: IParserStrategy<any>[]
    ) => IRadioBaseInput | undefined
    createTextBased: (
        descriptor: IFieldDescriptor,
        validationStrategies: IValidationMethodStrategy[],
        trackingStrategies: ITrackingOutputProvider[],
        valueStrategies: IParserStrategy<any>[]
    ) => ITextBaseInput | undefined
    createFieldInput: () => IFieldBaseInput | undefined
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
    createTextBased
})
