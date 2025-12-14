import { clx, genericStyling } from 'formular.design.system'
import { Label } from '../label/label.ui'
import { ICheckboxInput } from './checkbox-input.types'

export const CheckboxInput = ({
    option,
    tabIndex,
    className,
    initialState,
    onKeyDown,
    onKeyUp,
    onChange,
    size,
    variants = {},
    ...rest
}: ICheckboxInput) => {
    const classStyle = genericStyling('checkboxInput', variants) // Now using V2 unified API with typography separation

    const clbackGround = classStyle?.background
    const cltext = classStyle?.text
    const clborders = classStyle?.border

    // Individual color classes for atomic styling
    const backgroundColor = classStyle?.backgroundColor
    const textColor = classStyle?.textColor
    const borderColor = classStyle?.borderColor

    return (
        <div
            className={clx(
                'flex items-center py-1',
                'radio-item-group',
                className ?? '',
                backgroundColor,
                clbackGround
            )}
        >
            <input
                id={option.id}
                data-sequence-id={option.sequenceId}
                data-class="base-checkbox "
                tabIndex={tabIndex}
                className={clx('form-checkbox', borderColor, clborders)}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
                type="checkbox"
                defaultChecked={initialState ? true : false}
                aria-labelledby={`${option.id}`}
                aria-label={option.text}
                aria-checked={initialState ? 'true' : 'false'}
                style={{ width: `${size}em`, height: `${size}em` }}
                {...rest}
            />
            {option.text && (
                <Label
                    id={`ml-2 checkbox-label-${option.id}`}
                    htmlFor={option.id}
                    text={option.text}
                    variants={variants}
                    className={clx('cursor-pointer', 'select-none')}
                />
            )}
        </div>
    )
}
