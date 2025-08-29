import { useField } from '@adapters/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import useKeyBindings from '@adapters/react/hooks/use-key-bindings'

import { isMissing, MissingPropEnum } from 'formular.dev.lib'
// Import design system utilities
import { cx, genericStyling } from 'formular.design.system'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import ValidationResultComponent from '../validation-result/validation-result'

/**
 * Props for the InputText component.
 */
interface IInputTextProps {
    /** The name of the field as defined in the form schema */
    fieldName: string
}

/**
 * A text input component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete text input solution with:
 * - Automatic field binding and state management
 * - Real-time validation with visual feedback
 * - Keyboard navigation support (Delete key to clear)
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 *
 * The component automatically connects to the form instance via context and manages
 * its own state through the FORMULAR input engine.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a field name in your form's schema definition.
 *
 * @returns A rendered text input field with validation and state management
 *
 * @example
 * ```tsx
 * // Basic usage
 * <InputText fieldName="username" />
 * ```
 *
 * @example
 * ```tsx
 * // Within a form
 * <FormularForm formular={myFormInstance}>
 *   <InputText fieldName="firstName" />
 *   <InputText fieldName="lastName" />
 *   <InputText fieldName="email" />
 * </FormularForm>
 * ```
 *
 * @example
 * ```tsx
 * // With form schema
 * const schema = {
 *   properties: [
 *     InputTextBuilder.setId(1)
 *       .setName('username')
 *       .setLabel('Username')
 *       .setValidationData(true, Validators.required().build())
 *       .build()
 *   ]
 * }
 *
 * // Component automatically binds to the 'username' field
 * <InputText fieldName="username" />
 * ```
 *
 * @remarks
 * - The fieldName must match a field defined in your form schema
 * - The component handles its own validation state and error display
 * - Supports keyboard shortcuts (Delete key clears the field)
 * - Automatically focuses when the field wrapper is clicked
 * - Integrates with the form's submission and validation lifecycle
 */
const InputText = ({ fieldName }: IInputTextProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const handleDelete = () => {
        instance?.input?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(instance)

    return (
        <FieldSet
            id={instance?.input?.id ?? isMissing(MissingPropEnum.ID, InputText.name)}
            name={instance?.input?.name ?? isMissing(MissingPropEnum.NAME, InputText.name)}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={() => {
                instance?.input?.focus()
            }}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={instance?.input.isFocus ?? false}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                className={cx(
                    'base-input',
                    ...(() => {
                        const inputStyles = genericStyling('baseInput', {
                            variant: 'primary',
                            states: {
                                hasErrors: (instance?.input?.validationResults?.length ?? 0) > 0,
                                hasFocused: instance?.input?.isFocus ?? false,
                                hasDisable: instance?.input?.disabled ?? false
                            }
                        } as any)
                        const clbackGround = inputStyles?.background
                        const cltext = inputStyles?.text
                        const clborders = inputStyles?.border ? [inputStyles.border] : []

                        // Individual color classes for atomic styling
                        const backgroundColor = inputStyles?.backgroundColor
                        const textColor = inputStyles?.textColor
                        const borderColor = inputStyles?.borderColor

                        return [
                            ...(backgroundColor ? [backgroundColor] : []),
                            ...(textColor ? [textColor] : []),
                            ...(borderColor ? [borderColor] : []),
                            ...(Array.isArray(clbackGround)
                                ? clbackGround
                                : clbackGround
                                  ? [clbackGround]
                                  : []),
                            ...(Array.isArray(cltext) ? cltext : cltext ? [cltext] : []),
                            ...clborders
                        ]
                    })()
                )}
                {...instance?.register()}
                ref={(r) => instance?.ref(r)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                type="text"
            />
        </FieldSet>
    )
}
export default InputText
