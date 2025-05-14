import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'

export const conventions = {
    IdIsEmpty: function (): never {
        throw Error('MISSING ID!')
    },
    NameIsEmpty: function (): never {
        throw Error('MISSING NAME!')
    },
    suffix: {
        labelId: '-label'
    },
    tokens: {
        validationDataToken1: '|data|',
        validationDataToken2: '|data2|'
    },
    validations: {
        triggerDelay: 2500
    },
    dataTypes: {
        date: {
            separator: '-',
            formatValue: DatePickerFormatsEnum.YYYY_MM_DD,
            formatDisplay: DatePickerFormatsEnum.DD_MM_YYYY
        }
    }
}
