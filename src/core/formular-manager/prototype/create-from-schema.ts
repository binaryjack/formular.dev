import { Formular } from '@core/formular-base/formular-base'
import { IFormular } from '@core/formular-base/formular-base.types'
import { schemaToConfiguration } from '@core/framework/converters/schema-to-configuration copy'
import { IValidationLocalize } from '@core/framework/localize/localize.type'
import { TranslatioBuilderType } from '@core/framework/localize/localize.utils'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'
import { InputsProviderFromConfigurations } from '@core/input-engine/generator/input-provider'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { IFormularManager } from '../formular-manager.types'

export const createFromSchema = function (
    this: IFormularManager,
    schema: IEntityScheme,
    initialization: IFieldInitializationParameters,
    dependencies: IInitializableDependency[],
    tb: TranslatioBuilderType,
    transdlations: IValidationLocalize
): IFormular | undefined {
    const configurations = schemaToConfiguration(
        schema,
        initialization,
        dependencies,
        tb,
        transdlations
    )

    const frm = new Formular(schema.name, this)
    const fields = InputsProviderFromConfigurations(configurations)
    frm.addFields(...fields)
    this.forms.set(schema.name, frm)
    return this.forms.get(schema.name) as IFormular
}
