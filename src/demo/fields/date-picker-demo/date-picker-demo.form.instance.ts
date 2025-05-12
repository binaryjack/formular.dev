import { FormularManager } from '@core/formular-manager/formular-manager'
import { getTranslationBuilder, getTranslations } from '@core/framework/localize/localize.utils'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { _intNotificationTracker } from '@core/managers/notification-manager/notification-manager'
import { datePickerDemoSchema } from './date-picker-demo.schema'

const fm = new FormularManager(_intNotificationTracker)

export const datePickerDemoFormInstance = fm.createFromSchema(
    datePickerDemoSchema,
    defaultInitializationParameters,
    defaultInitializationDependencies,
    getTranslationBuilder,
    getTranslations()
)
