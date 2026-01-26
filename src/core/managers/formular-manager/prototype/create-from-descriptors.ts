import { Formular } from '@core/formular-engine/formular-base/formular-base'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'

import { IInputFactory, SInputFactory } from '@core/factories/input-factory/input-factory'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { SConfigurationManager } from '@core/managers/configuration-manager/interfaces/i-configuration-manager'
import {
    IValidationTriggerService,
    SValidationTriggerService
} from '@setup/services/validation-trigger-service'
import { IFormularManager } from '../formular-manager.types'

export const createFromDescriptors = async function <T extends object>(
    this: IFormularManager,
    id: string,
    descriptors: IFieldDescriptor[]
): Promise<IFormular<T> | undefined> {
    if (this.forms.has(id)) {
        const existingForm = this.forms.get(id)
        return existingForm as IFormular<T>
    }
    const frm = new Formular(id, this)

    // 🔧 FIX: Set validation triggers on form BEFORE adding fields
    // This ensures fields inherit the correct triggerKeyWordType when added
    const validationTriggerService =
        this.sm.lazy<IValidationTriggerService>(SValidationTriggerService)?.()
    if (validationTriggerService?.triggers?.length) {
        frm.setTriggerKeyWord(validationTriggerService.triggers)
    }

    // Enable introspection helpers if configured
    const configManager = this.sm.lazy<any>(SConfigurationManager)?.()
    const introspectionEnabled =
        configManager?.getConfigByName('behavior', 'form', 'enableIntrospection') ?? false
    const debugStreamSize =
        configManager?.getConfigByName('behavior', 'form', 'debugStreamSize') ?? 100

    ;(frm as any)._introspectionEnabled = introspectionEnabled
    ;(frm as any)._debugStreamMaxSize = debugStreamSize

    const factory = this.sm.lazy<IInputFactory>(SInputFactory)?.()

    const fields: IExtendedInput[] = []

    for (const descriptor of descriptors) {
        if (!descriptor) {
            continue
        }
        const fieldBuilder = factory.create(descriptor.type)
        const field = await fieldBuilder(descriptor)
        fields.push(field as IExtendedInput)
    }

    frm.addFields(...fields)
    this.forms.set(id, frm)
    return frm
}
