import { newFormy } from '../../components/Formy/Formy.context'
import { getTranslationBuilder, getTranslations } from '../../dependency/localize/localize.utils'
import controlDemoSchema from '../../dependency/schema/demo.schema'

export const demoFormInstance = newFormy(
    'demoForm',
    controlDemoSchema,
    getTranslationBuilder,
    getTranslations
)
