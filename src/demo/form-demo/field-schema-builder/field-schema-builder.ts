import { FieldSchemaFactory } from '@core/framework/schema/field-schema/field.schema.factory'
import { DateBuilder } from './builders-preset/date-builder'
import { IdBuilder } from './builders-preset/id-builder'
import { InputTextBuilder } from './builders-preset/input-text-builder'
import { OrderBuilder } from './builders-preset/order-builder'
import { PasswordBuilder } from './builders-preset/password-builder'
import { RangeBuilder } from './builders-preset/range-slider-builder'
import { RteBuilder } from './builders-preset/rich-text-field-builder'
import { SelectIdBuilder } from './builders-preset/select-options-id-builder'
import { ShowRoomsBuilder } from './builders-preset/select-showrooms-builder'
import { RadioBuilder } from './builders-preset/selected-radio-id-builder'
import { ToggleBuilder } from './builders-preset/toggle-builder'
import { CheckBuilder } from './builders-preset/true-false-value-builder'
import { UserIdBuilder } from './builders-preset/user-name-builder'

const fieldSchemeFactory = new FieldSchemaFactory()

fieldSchemeFactory.addBuilders(
    IdBuilder,
    OrderBuilder,
    ShowRoomsBuilder,
    InputTextBuilder,
    SelectIdBuilder,
    CheckBuilder,
    DateBuilder,
    RadioBuilder,
    RteBuilder,
    RangeBuilder,
    UserIdBuilder,
    PasswordBuilder,
    ToggleBuilder
)

export default fieldSchemeFactory
