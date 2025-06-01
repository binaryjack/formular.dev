import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import {
    IValidationOptions,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'

export interface IRequiredProps {
    validationOptions: IValidationOptions
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const Required = ({ validationOptions, handleValidationOptionChange }: IRequiredProps) => {
    return (
        <div className="flex px-2 flex-col w-full">
            <label htmlFor="required-v">Required:</label>{' '}
            <input
                id="required-v"
                type="checkbox"
                checked={validationOptions.required?.value ?? false}
                onChange={(e) =>
                    handleValidationOptionChange('required', {
                        required: e.target.checked,
                        error: newFieldError(
                            'sandboxField',
                            ValidationErrorsCodes.required,
                            `This field is required.`
                        ),
                        guide: newFieldGuide(
                            'sandboxField',
                            ValidationErrorsCodes.required,
                            `Please fill out this field.`
                        )
                    })
                }
            />
        </div>
    )
}
