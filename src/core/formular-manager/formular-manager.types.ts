import { IFormular } from '@core/formular-base/formular-base.types'
import { IValidationLocalize } from '@core/framework/localize/localize.type'
import { TranslatioBuilderType } from '@core/framework/localize/localize.utils'

import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'

export interface IFormularManager {
    new (
        notificationManager?: INotificationManager,
        autoTracker?: INotificationManager
    ): IFormularManager
    forms: Map<string, IFormular>
    notificationManager?: INotificationManager
    clear: (formId: IFormular) => void
    clearAll: () => void
    getForm: (formId: string) => IFormular | undefined
    getData: <T extends object>(formId: string) => T | undefined
    validate: (formId: string) => Promise<boolean>

    createfromDescriptor: (id: string, configs: IDependencyConfiguration[]) => IFormular | undefined
    createFromSchema: (
        schema: IEntityScheme,
        initialization: IFieldInitializationParameters,
        dependencies: IInitializableDependency[],
        tb: TranslatioBuilderType,
        transdlations: IValidationLocalize
    ) => IFormular | undefined
    createEmpty: (name: string) => IFormular | undefined
}
