import { Label } from '@components/__v2/label/label.ui'
import { cx } from 'formular.design.system'
import { RadioOption } from '../options/radio-option.ui'
import { IRadioOptionGroup } from './radio-option-group.ui.types'

export const RadioOptionGroup = ({ labelProps, radioOptionProps }: IRadioOptionGroup) => {
    return (
        <div className={cx('flex items-center py-1', 'radio-item-group')}>
            <RadioOption {...radioOptionProps} />
            <Label {...labelProps} />
        </div>
    )
}
