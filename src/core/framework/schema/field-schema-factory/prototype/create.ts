import { logManager } from '@core/managers/log-manager/log-manager'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { IFieldSchemaBuilder } from '../../field-schema/field-schema-types'
import { IOptionItem } from '../../options-schema/options.scheme.types'
import { IFieldSchemeFactory } from '../field-schema-factory.types'

/**
 * Creates a field schema using the specified builder name and options.
 * @param name The name of the builder to use.
 * @param target The target for the field schema.
 * @param options The options for the field schema.
 * @param shouldValidate Whether validation should be applied.
 * @param validationOptions Optional validation options.
 * @returns The built field schema or undefined if not found.
 */
export function create(
    this: IFieldSchemeFactory,
    name: string,
    target: string | null,
    options: IOptionItem[],
    shouldValidate: boolean,
    validationOptions?: IValidationOptions
) {
    const _innerBuilder = this.builders.find((o: IFieldSchemaBuilder) => o.name === name)

    if (!_innerBuilder) {
        logManager(
            undefined,
            'error',
            'FieldSchemaFactory',
            `unable to find the builder for ${name}`
        )
        return undefined
    }

    return _innerBuilder
        .setOptionData(target, options)
        .setValidationData(shouldValidate, validationOptions)
        .build()
}
