import { FormularManager } from '@core/formular-manager/formular-manager'
import { getTranslationBuilder, getTranslations } from '@core/framework/localize/localize.utils'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { datePickerDemoSchema } from './date-picker-demo.schema'

const fm = new FormularManager(lifeCylceInstances.autoTracker)

export const datePickerDemoFormInstance = fm.createFromSchema(
    datePickerDemoSchema,
    defaultInitializationParameters,
    defaultInitializationDependencies,
    getTranslationBuilder,
    getTranslations()
)
