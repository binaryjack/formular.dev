import { cx } from 'formular.design.system'
import { Label } from '../label/label.ui'
import { ICheckboxInput } from './checkbox-input.types'

export const CheckboxInput = ({
    id,
    label,
    tabIndex,
    className,
    initialState,
    onKeyDown,
    onKeyUp,
    onChange,
    size,
    ...rest
}: ICheckboxInput) => {
    return (
        <div className={cx('flex items-center py-1', 'radio-item-group')}>
            <input
                id={id}
                data-class="base-checkbox "
                tabIndex={tabIndex}
                className={className}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
                type="checkbox"
                defaultChecked={initialState ? true : false}
                aria-labelledby={`checkbox-label-${id}`}
                aria-label={label}
                aria-checked={initialState ? 'true' : 'false'}
                style={{ width: `${size}em`, height: `${size}em` }}
                {...rest}
            />
            {label && <Label id={`ml-2 checkbox-label-${id}`} htmlFor={id} text={label} />}
        </div>
    )
}
