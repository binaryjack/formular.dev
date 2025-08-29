import { ILabelProps } from '@components/__v2/label/label.types'
import { IComponentStyleConfig } from 'formular.design.system/dist/utilities/generic-style/utils/atomic-style-builder'
import { IRadioOptionProps } from '../options/radio-option.types'

export interface IRadioOptionGroup {
    radioOptionProps: IRadioOptionProps
    labelProps: ILabelProps
    className?: string
    variants?: Partial<IComponentStyleConfig>
}
