import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'

import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IServiceManager } from '../service-manager/service-manager.types'

export const SFormularManager = Symbol.for('IFormularManager')

export interface IFormularManager<T extends object> {
    new (
        notificationManager?: INotificationManager,
        autoTracker?: INotificationManager
    ): IFormularManager<T>
    sm: IServiceManager
    forms: Map<string, IFormular<T>>
    readonly notificationManager?: INotificationManager
    clear: (formId: IFormular<T>) => void
    clearAll: () => void
    getForm: (formId: string) => IFormular<T> | undefined
    getData: <T extends object>(formId: string) => T | undefined
    validate: (formId: string) => Promise<boolean>

    createFromDescriptors: (id: string, descriptor: IFieldDescriptor[]) => IFormular<T> | undefined
    createFromSchema: (schema: IEntityScheme) => IFormular<T> | undefined
    createEmpty: (name: string) => IFormular<T> | undefined
}
