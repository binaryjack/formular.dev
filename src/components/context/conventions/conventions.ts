import { IButtonVariant } from '@components/button/button'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import { getSystemDateSeparator } from '@components/date-picker/core/system/get-local-system-separator'

export enum MissingPropEnum {
    ID = 'id',
    NAME = 'name',
    LABEL = 'label'
}

export const conventions = {
    IsMissing: function (property: MissingPropEnum, componentName: string): never {
        throw Error(
            `MISSING ${property.toUpperCase()}! ${componentName} component requires an ${property}. 
            This is probably due to the instance of the field 
            which has not the right name has it has being declared 
            in the model!`
        )
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
            separator: getSystemDateSeparator(),
            formatValue: DatePickerFormatsEnum.YYYY_MM_DD,
            formatDisplay: DatePickerFormatsEnum.DD_MM_YYYY
        }
    },
    formular: {
        creation: {
            enforceConfigurationCheck: true
        }
    },
    components: {
        drawer: {
            height: '350px',
            width: '250px'
        }
    },
    commands: {
        basic: {
            rounded: true,
            size: 'sm',
            width: '1.8em',
            height: '1.8em',
            className: 'ml-0'
        } as Partial<IButtonVariant>,
        submit: {
            rounded: true,
            size: 'lg',
            width: '5em',
            height: '5em',
            className: 'ml-0'
        } as Partial<IButtonVariant>
    }
}
