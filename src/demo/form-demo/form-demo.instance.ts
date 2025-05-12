import { FormularManager } from '@core/formular-manager/formular-manager'
import { getTranslationBuilder, getTranslations } from '@core/framework/localize/localize.utils'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { _intNotificationTracker } from '@core/managers/notification-manager/notification-manager'
import { controlsDemoSchema } from './form-demo.schema'

const fm = new FormularManager(_intNotificationTracker)

export const demoFormInstance = fm.createFromSchema(
    controlsDemoSchema,
    defaultInitializationParameters,
    defaultInitializationDependencies,
    getTranslationBuilder,
    getTranslations()
)
