import { Formular } from '@core/formular-engine/formular-base/formular-base'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'

import { IInputFactory, SInputFactory } from '@core/factories/input-factory/input-factory'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IFormularManager } from '../formular-manager.types'

export const createFromDescriptors = function <T extends object>(
    this: IFormularManager,
    id: string,
    descriptors: IFieldDescriptor[]
): IFormular<T> | undefined {
    if (this.forms.has(id)) {
        const existingForm = this.forms.get(id)
        return existingForm as IFormular<T>
    }
    const frm = new Formular(id, this)
    const factory = this.sm.lazy<IInputFactory>(SInputFactory)?.()

    const fields: IExtendedInput[] = []

    for (const descriptor of descriptors) {
        if (!descriptor) {
            continue
        }
        const fieldBuilder = factory.create(descriptor.type)
        fields.push(fieldBuilder(descriptor) as IExtendedInput)
    }

    frm.addFields(...fields)
    this.forms.set(id, frm)
    return frm
}
