import { generateLayoutClasses } from 'formular.design.system'
import { IFieldSetProps } from './field-set.types'

export const FieldSet = ({
    buttons,
    input,
    label,
    layout,
    layoutSet,
    fieldClasses,
    ...rest
}: IFieldSetProps) => {
    const {
        fieldSetClasses,
        labelClasses,
        inputContainerClasses,
        commandClasses,
        wrapperClasses,
        inputCommandsWrapperClasses
    } = generateLayoutClasses({ layout, layoutSet })

    return (
        <div
            tabIndex={-1}
            className={`form-fieldset ${fieldSetClasses}`}
            {...rest}
            id={`field-set-${rest.id}`}
        >
            <div tabIndex={-1} className={`flex w-full ${wrapperClasses}`}>
                {/* Label Section */}
                <div
                    tabIndex={-1}
                    className={`field-label ${labelClasses} ${fieldClasses?.label || ''}`}
                >
                    {label}
                </div>

                {/* Input + Commands Section (for hybrid and stack layouts) */}
                {inputCommandsWrapperClasses && (
                    <div tabIndex={-1} className={inputCommandsWrapperClasses}>
                        {/* Input Section */}
                        <div
                            tabIndex={-1}
                            className={`field-input-container ${inputContainerClasses} ${fieldClasses?.inputContainer || ''}`}
                        >
                            {input}
                        </div>

                        {/* Commands Section */}
                        <div
                            tabIndex={-1}
                            className={`field-commands ${commandClasses} ${fieldClasses?.commands || ''}`}
                        >
                            {buttons}
                        </div>
                    </div>
                )}

                {/* For inline layout, render input and commands as direct children */}
                {!inputCommandsWrapperClasses && (
                    <>
                        {/* Input Section */}
                        <div
                            tabIndex={-1}
                            className={`field-input-container ${inputContainerClasses} ${fieldClasses?.inputContainer || ''}`}
                        >
                            {input}
                        </div>

                        {/* Commands Section */}
                        <div
                            tabIndex={-1}
                            className={`field-commands ${commandClasses} ${fieldClasses?.commands || ''}`}
                        >
                            {buttons}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
