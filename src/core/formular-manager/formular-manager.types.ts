import { IValidationLocalize } from '@core/framework/localize/localize.type'
import { TranslatioBuilderType } from '@core/framework/localize/localize.utils'

import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'

import type { IFormular } from '@core/formular-base/formular-base.types'
export type { IFormular }

export interface IFormularManager {
    new (autoTracker?: INotificationManager): IFormularManager
    forms: Map<string, IFormular>
    autoTracker?: INotificationManager
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
}
