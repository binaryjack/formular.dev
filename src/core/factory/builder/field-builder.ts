import { ICheckBoxBaseInput } from '@core/fields/check-box-base-input/check-box-base-input.types'
import { IClickBaseInput } from '@core/fields/click-base-input/click-base-input.types'
import { FieldInput } from '@core/fields/field-base-input/field-input-base'
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
import { initialize } from './prototype/initialize'
import { initializeDommable } from './prototype/initialize-dommable'
import { initializeDrawerableState } from './prototype/initialize-drawerable-state'
import { initializeNotifier } from './prototype/initialize-notifier'
import { initializeStyle } from './prototype/initialize-style'
import { initializeTracking } from './prototype/initialize-tracking'
import { initializeValidationStrategy } from './prototype/initialize-validation-strategy'
import { initializeValueStrategy } from './prototype/initialize-value-strategy'
import { initializeEvents } from './prototype/intialize-events'

export interface IFieldBuilder extends IFieldBaseInput {
    new (descriptor: IFieldDescriptor): IFieldBuilder

    initialize: () => IFieldBuilder
    checkInitialized: () => boolean
    /** Abstract Base */
    initializeDommable: () => IFieldBuilder
    initializeNotifier: () => IFieldBuilder
    initializeTracking: (providers?: ITrackingOutputProvider[]) => IFieldBuilder
    initializeValueStrategy: (...parsers: IParserStrategy<any>[]) => IFieldBuilder
    initializeValidationStrategy: (
        descriptor: IFieldDescriptor,
        ...parsers: IValidationMethodStrategy[]
    ) => IFieldBuilder
    initializeDrawerableState: () => IFieldBuilder
    initializeStyle: () => IFieldBuilder
    initializeEvents: () => IFieldBuilder
    /** concrete */
    createClickBased: () => IClickBaseInput | undefined
    createOptionBased: () => IOptionBaseInput | undefined
    createCheckBased: () => ICheckBoxBaseInput | undefined
    createSelectBased: () => ISelectBaseInput | undefined
    createRadioBased: () => IRadioBaseInput | undefined
    createTextBased: () => ITextBaseInput | undefined
    createFieldInput: () => IFieldBaseInput | undefined
}

export const FieldBuilder = function (this: IFieldBuilder, descriptor: IFieldDescriptor) {
    FieldInput.call(this, descriptor)
} as any as IFieldBuilder

Object.assign(FieldBuilder.prototype, {
    ...FieldInput.prototype,
    initialize,
    initializeTracking,
    initializeDommable,
    initializeDrawerableState,
    initializeValidationStrategy,
    initializeValueStrategy,
    initializeNotifier,
    initializeEvents,
    initializeStyle,
    createClickBased,
    createOptionBased,
    createCheckBased,
    createSelectBased,
    createRadioBased,
    createTextBased
})
