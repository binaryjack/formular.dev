import { useField } from '@adapters/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import useKeyBindings from '@adapters/react/hooks/use-key-bindings'

import { isMissing, MissingPropEnum } from 'formular.dev.lib'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import ValidationResultComponent from '../validation-result/validation-result'

/**
 * Props for the CheckInput component.
 */
export interface ICheckInputProps {
    /** The name of the field as defined in the form schema */
    fieldName: string
    checked?: boolean
    disabled?: boolean
}

/**
 * A checkbox input component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete checkbox solution with:
 * - Automatic field binding and boolean state management
 * - Real-time validation with visual feedback
 * - Keyboard navigation support (Delete key to clear/uncheck)
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 *
 * The component automatically connects to the form instance via context and manages
 * its checked state through the FORMULAR input engine.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a boolean field name in your form's schema definition.
 *
 * @returns A rendered checkbox input field with validation and state management
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CheckInput fieldName="agreeToTerms" />
 * ```
 *
 * @example
 * ```tsx
 * // Within a form with schema
 * const schema = {
 *   properties: [
 *     CheckBuilder.setId(1)
 *       .setName('newsletter')
 *       .setLabel('Subscribe to newsletter')
 *       .build()
 *   ]
 * }
 *
 * <FormularForm formular={myFormInstance}>
 *   <CheckInput fieldName="newsletter" />
 *   <CheckInput fieldName="agreeToTerms" />
 * </FormularForm>
 * ```
 *
 * @example
 * ```tsx
 * // With validation
 * const schema = {
 *   properties: [
 *     CheckBuilder.setId(1)
 *       .setName('agreeToTerms')
 *       .setLabel('I agree to the terms and conditions')
 *       .setValidationData(true, Validators.required('You must agree to terms').build())
 *       .build()
 *   ]
 * }
 *
 * <CheckInput fieldName="agreeToTerms" />
 * ```
 *
 * @remarks
 * - The fieldName must match a boolean field defined in your form schema
 * - The component handles its own validation state and error display
 * - Supports keyboard shortcuts (Delete key unchecks the checkbox)
 * - Automatically focuses when the field wrapper is clicked
 * - Integrates with the form's submission and validation lifecycle
 * - The checked state is managed through the FORMULAR input engine
 */
const CheckInput = ({ fieldName, checked, disabled }: ICheckInputProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    // Add logging to track getValue calls
    console.log('CheckInput rendered with fieldName:', fieldName)

    const handleDelete = () => {
        console.log('handleDelete called for fieldName:', fieldName)
        instance?.input.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(
        instance,
        (value, isChecked: boolean) => {
            console.log(
                'useFieldDefaultValue triggered for fieldName:',
                fieldName,
                'with value:',
                value
            )
            if (!instance) return
            instance.input.valueManager.setValue(instance, isChecked)
        },
        [checked]
    )

    return (
        <FieldSet
            hasFocusIndicator={false}
            inputId={instance?.input?.name ?? isMissing(MissingPropEnum.ID, CheckInput.name)}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={() => {
                instance?.input?.focus()
            }}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={flags.focus}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <div className={`flex flex-1 items-center ml-1`}>
                <input
                    tabIndex={0}
                    data-class="base-checkbox "
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type="checkbox"
                    disabled={disabled}
                    {...instance?.register()}
                    ref={(r) => instance?.ref(r)}
                />
            </div>
        </FieldSet>
    )
}
export default CheckInput
