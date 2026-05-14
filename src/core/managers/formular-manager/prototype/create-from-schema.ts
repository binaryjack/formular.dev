import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { IEntityScheme } from '@core/framework/schema/field-schema/field-schema-types'

import { mapSchemaToFieldDescriptor } from '@core/framework/converters/to-field-descriptor'
import { IFormularManager } from '../formular-manager.types'

export const createFromSchema = function <T extends object>(
    this: IFormularManager,

    schema: IEntityScheme
): IFormular<T> | undefined {
    if (this.forms.has(schema.name)) {
        const existingForm = this.forms.get(schema.name)
        return existingForm as IFormular<T>
    }
    const descriptors = mapSchemaToFieldDescriptor(schema)
    this.createFromDescriptors(schema.name, descriptors)
}
