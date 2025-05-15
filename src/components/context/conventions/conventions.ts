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
        triggerDelay: 1000
    },
    events: {
        onChange: {
            triggerDelay: 500
        },
        onClick: {
            triggerDelay: 100
        },
        onSelect: {
            triggerDelay: 100
        }
    },
    dataTypes: {
        date: {
            separator: '-',
            formatValue: DatePickerFormatsEnum.YYYY_MM_DD,
            formatDisplay: DatePickerFormatsEnum.DD_MM_YYYY
        }
    }
}
