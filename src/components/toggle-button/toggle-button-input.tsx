import { useState } from 'react'

import { useField } from '@adapters/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import { conventions, MissingPropEnum } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import ValidationResultComponent from '../validation-result/validation-result'
import { ToggleButton } from './toggle-button'

/**
 * Props for the ToggleButtonInput component.
 */
interface IToggleButtonInputProps {
    /** The name of the field as defined in the form schema */
    fieldName: string
    /** The content to display inside the toggle button */
    children: React.ReactNode
}

/**
 * A toggle button input component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete toggle button solution with:
 * - Automatic field binding and boolean state management
 * - Visual toggle button with customizable content
 * - Real-time validation with visual feedback
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 * - Smooth toggle animations and state transitions
 *
 * The component automatically connects to the form instance via context and manages
 * boolean state through the FORMULAR input engine, providing an alternative to
 * checkboxes with a more prominent button-style interface.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a boolean field name in your form's schema definition.
 * @param props.children - The content to display inside the toggle button (text, icons, etc.)
 *
 * @returns A rendered toggle button with validation and state management
 *
 * @example
 * ```tsx
 * // Basic usage with text
 * <ToggleButtonInput fieldName="notifications">
 *   Enable Notifications
 * </ToggleButtonInput>
 * ```
 *
 * @example
 * ```tsx
 * // With icon and text
 * <ToggleButtonInput fieldName="darkMode">
 *   <MdDarkMode className="mr-2" />
 *   Dark Mode
 * </ToggleButtonInput>
 * ```
 *
 * @example
 * ```tsx
 * // Within a form with validation
 * const schema = {
 *   properties: [
 *     ToggleBuilder.setId(1)
 *       .setName('marketingEmails')
 *       .setLabel('Marketing Preferences')
 *       .setValidationData(true, Validators.required('Please make a selection').build())
 *       .build()
 *   ]
 * }
 *
 * <FormularForm formular={myFormInstance}>
 *   <ToggleButtonInput fieldName="marketingEmails">
 *     📧 Receive Marketing Emails
 *   </ToggleButtonInput>
 * </FormularForm>
 * ```
 *
 * @example
 * ```tsx
 * // Multiple toggle options
 * <div className="space-y-4">
 *   <ToggleButtonInput fieldName="newsletter">
 *     📰 Newsletter Subscription
 *   </ToggleButtonInput>
 *
 *   <ToggleButtonInput fieldName="smsAlerts">
 *     📱 SMS Alerts
 *   </ToggleButtonInput>
 *
 *   <ToggleButtonInput fieldName="pushNotifications">
 *     🔔 Push Notifications
 *   </ToggleButtonInput>
 * </div>
 * ```
 *
 * @remarks
 * - The fieldName must match a boolean field defined in your form schema
 * - The component provides a more prominent alternative to checkboxes
 * - Supports any React content as children (text, icons, components)
 * - Maintains toggle state internally and syncs with form state
 * - Provides visual feedback for on/off states with smooth transitions
 * - Automatically focuses when clicked and manages toggle state
 * - Integrates with the form's submission and validation lifecycle
 * - Supports keyboard navigation and accessibility standards
 */
const ToggleButtonInput = ({ fieldName, children }: IToggleButtonInputProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [toggleState, setToggleState] = useState<boolean>(false)

    const handleToggleChange = (id: string, newState: boolean) => {
        setToggleState(newState)
        instance?.input?.valueManager?.setValue(instance, newState)
    }

    useFieldDefaultValue(instance, (value) => {
        if (value !== undefined) {
            setToggleState(value === true)
        }
    })

    return (
        <FieldSet
            inputId={
                instance?.input?.name ??
                conventions.IsMissing(MissingPropEnum.ID, ToggleButtonInput.name)
            }
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
            onClear={() => {
                instance?.input?.clear()
                setToggleState(false)
            }}
        >
            <ToggleButton
                id={`${instance?.input?.name ?? conventions.IsMissing(MissingPropEnum.ID, ToggleButtonInput.name)}-toggle`}
                toggle={toggleState}
                onToggle={handleToggleChange}
                name={
                    instance?.input?.name ??
                    conventions.IsMissing(MissingPropEnum.NAME, ToggleButtonInput.name)
                }
                children={children}
            />
        </FieldSet>
    )
}

export default ToggleButtonInput
