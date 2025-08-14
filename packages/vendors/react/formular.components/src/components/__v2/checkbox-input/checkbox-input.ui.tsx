import { clx, genericStyle } from 'formular.design.system'
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
    variants = {},
    ...rest
}: ICheckboxInput) => {
    const classStyle = genericStyle({
        componentTypes: ['input', 'typography'],
        ...variants
    }) // Now using V2 unified API with typography separation

    const clbackGround = classStyle.backGround
    const cltext = classStyle.text
    const clborders = classStyle.borders
    const clstates = Object.values(classStyle.states).filter((o) => !!o)

    return (
        <div className={clx('flex items-center py-1', 'radio-item-group', ...clbackGround)}>
            <input
                id={id}
                data-class="base-checkbox "
                tabIndex={tabIndex}
                className={clx('form-checkbox', ...clborders, ...clstates)}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
                type="checkbox"
                defaultChecked={initialState ? true : false}
                aria-labelledby={`${id}`}
                aria-label={label}
                aria-checked={initialState ? 'true' : 'false'}
                style={{ width: `${size}em`, height: `${size}em` }}
                {...rest}
            />
            {label && (
                <Label
                    id={`ml-2 checkbox-label-${id}`}
                    htmlFor={id}
                    text={label}
                    variants={clx(...cltext)}
                />
            )}
        </div>
    )
}
