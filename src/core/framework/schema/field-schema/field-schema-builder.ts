import { IFieldSchemaBuilder } from './field-schema-types'
import { build } from './prototype/build'
import { clone } from './prototype/clone'
import { setDefaultValue } from './prototype/set-default-value'
import { setExpectedValue } from './prototype/set-expected-value'
import { setId } from './prototype/set-id'
import { setMask } from './prototype/set-mask'
import { setName } from './prototype/set-name'
import { setOptionData } from './prototype/set-option-data'
import { setTriggerKeyWord } from './prototype/set-trigger-key-word'
import { setTypeInput } from './prototype/set-type-input'
import { setValidationData } from './prototype/set-validation-data'

export const FieldSchemaBuilder = function (this: IFieldSchemaBuilder) {
    this.target = null
    this.options = []
    this.expectedValue = null
    this.shouldValidate = false
    this.triggerKeyWord = []
    this.mask = null
} as unknown as IFieldSchemaBuilder

Object.assign(FieldSchemaBuilder.prototype, {
    setId,
    setName,
    setTypeInput,
    setValidationData,
    setMask,
    setOptionData,
    setExpectedValue,
    setDefaultValue,
    setTriggerKeyWord,
    build,
    clone
})
