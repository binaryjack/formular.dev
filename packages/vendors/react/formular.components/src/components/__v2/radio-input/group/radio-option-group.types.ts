import { IComponentStyleConfig } from 'formular.design.system'

import { ILabelProps } from '@components/__v2/label/label.types'

import { IRadioOptionProps } from '../options/radio-option.types'

export interface IRadioOptionGroup {
    radioOptionProps: IRadioOptionProps
    labelProps: ILabelProps
    className?: string
    variants?: Partial<IComponentStyleConfig>
}
