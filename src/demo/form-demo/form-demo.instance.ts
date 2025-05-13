import { FormularManager } from '@core/formular-manager/formular-manager'
import { getTranslationBuilder, getTranslations } from '@core/framework/localize/localize.utils'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { controlsDemoSchema } from './form-demo.schema'

const fm = new FormularManager(lifeCylceInstances._intNotificationTracker)

export const demoFormInstance = fm.createFromSchema(
    controlsDemoSchema,
    defaultInitializationParameters,
    defaultInitializationDependencies,
    getTranslationBuilder,
    getTranslations()
)
