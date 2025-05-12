import { IValidationSchemaFactory } from '../validation.schema.factory.types'

export function createValidationSchemaBuilder<ValidationSchemaBuilderType>(
    this: IValidationSchemaFactory,
    builderName: string
) {
    const _builder = this.builders.find((o) => o.name === builderName)
    if (!_builder) return this.builders.find((o) => o.name === 'empty')
    return _builder as ValidationSchemaBuilderType
}
