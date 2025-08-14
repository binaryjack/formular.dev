import { ILabelProps } from '@components/__v2/label/label.types'
import { IComponentVariants } from 'formular.design.system'
import { IRadioOptionProps } from '../options/radio-option.types'

export interface IRadioOptionGroup {
    radioOptionProps: IRadioOptionProps
    labelProps: ILabelProps
    className?: string
    variants?: Omit<Partial<IComponentVariants>, 'ComponentTypes'>
}
