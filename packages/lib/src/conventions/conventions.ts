import { DateFormatsEnum } from '../core/framework/types/date/date.types'
import { getSystemDateSeparator } from '../core/framework/types/date/getters/get-local-system-separator'
import { MissingPropEnum } from './enums/missing-prop.enum'
import { IButtonVariant } from './interfaces/i-button-variant'

// Re-export the enum so it can be imported from conventions
export { MissingPropEnum }

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
        triggerDelay: 500
    },
    events: {
        onChange: {
            triggerDelay: 500
        },
        onClick: {
            triggerDelay: 500
        },
        onSelect: {
            triggerDelay: 500
        },
        onFocus: {
            triggerDelay: 500
        },
        onBlur: {
            triggerDelay: 500
        },
        onKeyDown: {
            triggerDelay: 500
        },
        onKeyUp: {
            triggerDelay: 500
        },
        onUiUpdate: {
            triggerDelay: 200
        },
        observables: {
            triggerDelay: 200
        }
    },
    dataTypes: {
        date: {
            separator: getSystemDateSeparator(),
            formatValue: DateFormatsEnum.YYYY_MM_DD,
            formatDisplay: DateFormatsEnum.DD_MM_YYYY
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
