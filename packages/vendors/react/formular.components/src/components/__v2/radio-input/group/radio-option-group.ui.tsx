import { Label } from '@components/__v2/label/label.ui'
import { clx } from 'formular.design.system'
import { RadioOption } from '../options/radio-option.ui'
import { IRadioOptionGroup } from './radio-option-group.types'

export const RadioOptionGroup = ({
    labelProps,
    radioOptionProps,
    className
}: IRadioOptionGroup) => {
    return (
        <div className={clx('flex items-center py-1', 'radio-item-group', className ?? '')}>
            <RadioOption {...radioOptionProps} />
            <Label {...labelProps} />
        </div>
    )
}
