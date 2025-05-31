import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'
import { GenericValidationBuilder } from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { maxValidationMock } from '@tests/mocks/max-validation-mock'
import { minValidationMock } from '@tests/mocks/min-validation-mock'
import { requiredDataValidationMock } from '@tests/mocks/required-data-validation-mock'

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraint(
        requiredDataValidationMock('fieldName', true),
        minValidationMock('fieldName', new Date('2023-01-01').getTime()),
        maxValidationMock('fieldName', new Date('2025-12-31').getTime())
    )
    .build()

export const DateBuilder = new FieldSchemaBuilder()
    .setTypeInput('date')
    .setMask('##/##/####')
    .setValidationData(true, validationOptionsMock)
