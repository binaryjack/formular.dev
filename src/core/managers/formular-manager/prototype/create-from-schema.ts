import { Formular } from '@core/formular-engine/formular-base/formular-base'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { schemaToConfiguration } from '@core/framework/converters/schema-to-configuration copy'
import { IValidationLocalize } from '@core/framework/localize/localize.type'
import { TranslatioBuilderType } from '@core/framework/localize/localize.utils'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'

import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { IFormularManager } from '../formular-manager.types'

export const createFromSchema = function <T extends object>(
    this: IFormularManager<T>,
    schema: IEntityScheme,
    initialization: IFieldInitializationParameters,
    dependencies: IInitializableDependency[],
    tb: TranslatioBuilderType,
    transdlations: IValidationLocalize
): IFormular<T> | undefined {
    if (this.forms.has(schema.name)) {
        const existingForm = this.forms.get(schema.name)
        return existingForm as IFormular<T>
    }

    const configurations = schemaToConfiguration(
        schema,
        initialization,
        dependencies,
        tb,
        transdlations
    )

    const frm = new Formular(schema.name, this)
    const fields = this.fieldProvider.createManyFromConfiguration(configurations)
    frm.addFields(...fields)
    this.forms.set(schema.name, frm)
    return frm
}
