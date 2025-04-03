import { newFormy } from '../../../components/Formy/Formy.context'
import { getTranslationBuilder, getTranslations } from '../../../dependency/localize/localize.utils'
import { dateTimeSchema } from './datepicker.schema'

export const demoFormInstance = newFormy(
    'date-picker-form-schema',
    dateTimeSchema,
    getTranslationBuilder,
    getTranslations,
    ['onChange']
)
