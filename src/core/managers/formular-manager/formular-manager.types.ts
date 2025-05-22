import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { IValidationLocalize } from '@core/framework/localize/localize.type'
import { TranslatioBuilderType } from '@core/framework/localize/localize.utils'

import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'
import { IFieldProvider } from '@core/input-engine/generator/provider/field-provider/field.provider.types'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'

export interface IFormularManager<T extends object> {
    new (
        notificationManager?: INotificationManager,
        autoTracker?: INotificationManager
    ): IFormularManager<T>
    readonly fieldProvider: IFieldProvider<any>
    forms: Map<string, IFormular<T>>
    readonly notificationManager?: INotificationManager
    clear: (formId: IFormular<T>) => void
    clearAll: () => void
    getForm: (formId: string) => IFormular<T> | undefined
    getData: <T extends object>(formId: string) => T | undefined
    validate: (formId: string) => Promise<boolean>

    createfromConfiguration: (
        id: string,
        configs: IDependencyConfiguration[]
    ) => IFormular<T> | undefined
    createFromSchema: (
        schema: IEntityScheme,
        initialization: IFieldInitializationParameters,
        dependencies: IInitializableDependency[],
        tb: TranslatioBuilderType,
        transdlations: IValidationLocalize
    ) => IFormular<T> | undefined
    createEmpty: (name: string) => IFormular<T> | undefined
}
