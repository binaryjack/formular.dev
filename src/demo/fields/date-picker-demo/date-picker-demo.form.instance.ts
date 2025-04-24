import { newFormy } from '../../../components/formy/formy.context'
import { getTranslationBuilder, getTranslations } from '../../../dependency/localize/localize.utils'
import { dateTimeSchema } from './date-picker-demo.schema'

export const demoFormInstance = newFormy(
    'date-picker-form-schema',
    dateTimeSchema,
    getTranslationBuilder,
    getTranslations,
    ['onChange']
)
