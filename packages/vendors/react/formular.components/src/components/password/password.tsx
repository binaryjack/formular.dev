import React, { useEffect, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

import { useField } from '@adapters/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import useFormularContext from '@components/formular-form/formular-form.context'

import { Button, IButtonVariant } from '../button/button'

import useAppContext from '@components/context/app-context/app-context.context'
import { cx, generateInputStyles } from 'formular.design.system'
import { isMissing, MissingPropEnum } from 'formular.dev.lib'
import FieldSet from '../field-set/field-set'
import { Portal } from '../portals/portals'
import ValidationResultComponent from '../validation-result/validation-result'

/**
 * Props for the Password component.
 */
interface IPasswordProps {
    /** The name of the field as defined in the form schema */
    fieldName: string
}

/**
 * A password input component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete password input solution with:
 * - Automatic field binding and secure input handling
 * - Toggle visibility functionality (show/hide password)
 * - Real-time validation with visual feedback
 * - Keyboard navigation support (Delete key to clear)
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 * - Built-in security features (autocomplete disabled)
 *
 * The component automatically connects to the form instance via context and manages
 * its state through the FORMULAR input engine, with additional password-specific
 * security and usability features.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a password field name in your form's schema definition.
 *
 * @returns A rendered password input field with visibility toggle and validation
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Password fieldName="password" />
 * ```
 *
 * @example
 * ```tsx
 * // Within a form with validation
 * const schema = {
 *   properties: [
 *     PasswordBuilder.setId(1)
 *       .setName('password')
 *       .setLabel('Password')
 *       .setValidationData(true, Validators.password('password', true).build())
 *       .build()
 *   ]
 * }
 *
 * <FormularForm formular={myFormInstance}>
 *   <Password fieldName="password" />
 *   <Password fieldName="confirmPassword" />
 * </FormularForm>
 * ```
 *
 * @example
 * ```tsx
 * // With custom validation rules
 * const schema = {
 *   properties: [
 *     PasswordBuilder.setId(1)
 *       .setName('newPassword')
 *       .setLabel('New Password')
 *       .setValidationData(true,
 *         Validators.password('newPassword', true)
 *           .minLength(8)
 *           .requireUppercase()
 *           .requireLowercase()
 *           .requireNumbers()
 *           .requireSpecialChars()
 *           .build()
 *       )
 *       .build()
 *   ]
 * }
 *
 * <Password fieldName="newPassword" />
 * ```
 *
 * @remarks
 * - The fieldName must match a password field defined in your form schema
 * - The component includes a visibility toggle button for better UX
 * - Autocomplete is disabled for security reasons
 * - Supports keyboard shortcuts (Delete key clears the field)
 * - Automatically focuses when the field wrapper is clicked
 * - Integrates with the form's submission and validation lifecycle
 * - The visibility toggle is accessible via keyboard navigation
 * - Provides real-time validation feedback for password strength
 */
const Password = ({ fieldName }: IPasswordProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const { getConfiguration } = useAppContext()
    const primaryConfig = getConfiguration<Partial<IButtonVariant> | undefined>(
        'rendering',
        'commands',
        'primary'
    )

    const handleDelete = () => {
        instance?.input?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(instance)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev)
    }

    const fieldId = instance?.input?.name ?? isMissing(MissingPropEnum.ID, Password.name)

    useEffect(() => {
        instance?.register()
    }, [instance])

    return (
        <FieldSet
            id={instance?.input?.id ?? isMissing(MissingPropEnum.ID, Password.name)}
            name={instance?.input?.name ?? isMissing(MissingPropEnum.NAME, Password.name)}
            label={instance?.input?.label}
            type="password"
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
            <div className={cx('relative flex items-center w-full')}>
                <input
                    tabIndex={0}
                    data-class="base-input"
                    className={cx(
                        generateInputStyles('md', {
                            error: !!instance?.input?.validationResults?.length,
                            focused: flags.focus,
                            disabled: false,
                            hovered: false,
                            pressed: false,
                            loading: false
                        }),
                        'w-full pr-12'
                    )}
                    {...instance?.register()}
                    ref={(r) => instance?.ref(r)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type={isPasswordVisible ? 'text' : 'password'}
                />

                <Portal
                    id={fieldId}
                    slotName={'toggle-password'}
                    children={
                        <Button
                            id={`${fieldId}-toggle-password`}
                            title={'toggle password visibility'}
                            variantProperties={primaryConfig}
                            onClickCallback={togglePasswordVisibility}
                            aria-label="Toggle password visibility"
                        >
                            {isPasswordVisible ? <MdVisibilityOff /> : <MdVisibility />}
                        </Button>
                    }
                />
            </div>
        </FieldSet>
    )
}

export default React.memo(Password)
