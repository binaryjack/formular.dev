import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { IValidationLocalize } from '../localize/localize.type'
import { TranslatioBuilderType } from '../localize/localize.utils'
import { IEntityScheme } from '../schema/field-schema/field.schema.types'
import { descriptorsToConfiguration } from './descriptors-to-configuration'
import { mapSchemaToFieldDescriptor } from './to-field-descriptor'

export const schemaToConfiguration = (
    schema: IEntityScheme,
    initialization: IFieldInitializationParameters,
    dependencies: IInitializableDependency[],
    tb: TranslatioBuilderType,
    transdlations: IValidationLocalize
): IDependencyConfiguration[] => {
    const descriptors = mapSchemaToFieldDescriptor(schema, tb, transdlations)
    return descriptorsToConfiguration(descriptors, initialization, dependencies)
}
