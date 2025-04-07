import { newFormy } from '../../components/formy/Formy.context'
import { getTranslationBuilder, getTranslations } from '../../dependency/localize/localize.utils'
import { controlsDemoSchema } from './FormDemo.schema'

export const demoFormInstance = newFormy(
    'demoForm',
    controlsDemoSchema,
    getTranslationBuilder,
    getTranslations,
    ['onChange', 'onBlur']
)
