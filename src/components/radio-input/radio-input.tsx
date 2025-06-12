import { useField } from '@adapters/react/fields/hooks/use-field'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IRadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input.types'
import { conventions, MissingPropEnum } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import ValidationResultComponent from '../validation-result/validation-result'
import './radio-input.css'
import RadioInputOption from './radio-input.option'

/**
 * Props for the RadioInput component.
 */
interface IRadioInputProps {
    /** The name of the field as defined in the form schema */
    fieldName: string
}

/**
 * A radio button group component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete radio button group solution with:
 * - Automatic field binding and option management
 * - Single-selection radio button behavior
 * - Real-time validation with visual feedback
 * - Keyboard navigation support
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 *
 * The component automatically renders radio options based on the field's option data
 * and connects to the form instance via context, managing the selected state through
 * the FORMULAR input engine.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a radio field name in your form's schema definition.
 *
 * @returns A rendered radio button group with validation and state management
 *
 * @example
 * ```tsx
 * // Basic usage
 * <RadioInput fieldName="gender" />
 * ```
 *
 * @example
 * ```tsx
 * // Within a form with options
 * const schema = {
 *   properties: [
 *     RadioBuilder.setId(1)
 *       .setName('priority')
 *       .setLabel('Priority Level')
 *       .setOptionData('priority', [
 *         { id: 1, value: 'low', label: 'Low Priority' },
 *         { id: 2, value: 'medium', label: 'Medium Priority' },
 *         { id: 3, value: 'high', label: 'High Priority' }
 *       ])
 *       .build()
 *   ]
 * }
 *
 * <FormularForm formular={myFormInstance}>
 *   <RadioInput fieldName="priority" />
 * </FormularForm>
 * ```
 *
 * @example
 * ```tsx
 * // With validation
 * const schema = {
 *   properties: [
 *     RadioBuilder.setId(1)
 *       .setName('agreement')
 *       .setLabel('Do you agree?')
 *       .setOptionData('agreement', [
 *         { id: 1, value: 'yes', label: 'Yes, I agree' },
 *         { id: 2, value: 'no', label: 'No, I disagree' }
 *       ])
 *       .setValidationData(true, Validators.required('Please make a selection').build())
 *       .build()
 *   ]
 * }
 *
 * <RadioInput fieldName="agreement" />
 * ```
 *
 * @remarks
 * - The fieldName must match a radio field defined in your form schema
 * - Options are defined in the form schema using setOptionData()
 * - Only one option can be selected at a time (radio behavior)
 * - Each radio option is rendered as a separate RadioInputOption component
 * - Supports keyboard navigation and accessibility standards
 * - Automatically focuses when clicked and manages selection state
 * - Integrates with the form's submission and validation lifecycle
 * - Provides visual feedback for the currently selected option
 */
const RadioInput = ({ fieldName }: IRadioInputProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    // useFieldDefaultValue(field)

    return (
        <FieldSet
            inputId={
                instance?.input?.name ?? conventions.IsMissing(MissingPropEnum.ID, RadioInput.name)
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
            onClear={() => instance?.input?.clear()}
        >
            <ul className={`radio-group`} data-selected={instance?.input?.value ?? ''}>
                {instance?.optionBase?.options?.map((option: IOptionItem) => {
                    return (
                        <RadioInputOption
                            key={`${instance?.input.id}-${option.id}`}
                            field={instance as unknown as IRadioBaseInput}
                            option={option}
                        />
                    )
                })}
            </ul>
        </FieldSet>
    )
}
export default RadioInput
