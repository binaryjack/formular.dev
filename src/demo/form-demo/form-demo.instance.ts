import { newFormy } from '@components/formy/formy.context'
import { getTranslationBuilder, getTranslations } from '@dependency/localize/localize.utils'
import { controlsDemoSchema } from './form-demo.schema'

export const demoFormInstance = newFormy(
    'demoForm',
    controlsDemoSchema,
    getTranslationBuilder,
    getTranslations,
    ['onChange', 'onBlur']
)
