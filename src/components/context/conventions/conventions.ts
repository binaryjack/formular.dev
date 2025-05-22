import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'

export const conventions = {
    IdIsEmpty: function (): never {
        throw Error('MISSING ID!')
    },
    NameIsEmpty: function (): never {
        throw Error('MISSING NAME!')
    },
    suffix: {
        labelId: '-label',
        describedById: '-describedby'
    },
    tokens: {
        validationDataToken1: '|data|',
        validationDataToken2: '|data2|'
    },
    validations: {
        triggerDelay: 10
    },
    events: {
        onChange: {
            triggerDelay: 400
        },
        onClick: {
            triggerDelay: 200
        },
        onSelect: {
            triggerDelay: 200
        },
        onFocus: {
            triggerDelay: 200
        },
        onBlur: {
            triggerDelay: 200
        },
        onKeyDown: {
            triggerDelay: 200
        },
        onKeyUp: {
            triggerDelay: 200
        },
        onUiUpdate: {
            triggerDelay: 5
        }
    },
    dataTypes: {
        date: {
            separator: '-',
            formatValue: DatePickerFormatsEnum.YYYY_MM_DD,
            formatDisplay: DatePickerFormatsEnum.DD_MM_YYYY
        }
    },
    formular: {
        creation: {
            enforceConfigurationCheck: true
        }
    }
}
