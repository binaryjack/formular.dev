import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'

import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IServiceManager } from '../service-manager/service-manager.types'

export const SFormularManager = Symbol.for('IFormularManager')

export interface IFormularManager {
    new (serviceManager: IServiceManager): IFormularManager
    sm: IServiceManager
    forms: Map<string, IFormular<any>>
    readonly notificationManager?: INotificationManager
    clear: <T extends object>(formId: IFormular<T>) => void
    clearAll: () => void
    getForm: (formId: string) => IFormular<any> | undefined
    getData: <T extends object>(formId: string) => T | undefined
    validate: (formId: string) => Promise<boolean>

    createFromDescriptors: <T extends object>(
        id: string,
        descriptor: IFieldDescriptor[]
    ) => IFormular<T> | undefined
    createFromSchema: <T extends object>(schema: IEntityScheme) => IFormular<T> | undefined
    createEmpty: <T extends object>(name: string) => IFormular<T> | undefined
}
