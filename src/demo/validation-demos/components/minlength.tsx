import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import {
    IValidationOptions,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'

export interface IMinLengthProps {
    validationOptions: IValidationOptions
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const MinLength = ({ validationOptions, handleValidationOptionChange }: IMinLengthProps) => {
    return (
        <div className="flex px-2 flex-col w-full">
            <label htmlFor="minlength-v">Min Length:</label>{' '}
            <input
                id="minlength-v"
                type="number"
                value={validationOptions.minLength?.value ?? ''}
                onChange={(e) =>
                    handleValidationOptionChange('minLength', {
                        minLength: parseInt(e.target.value, 10),
                        error: newFieldError(
                            'sandboxField',
                            ValidationErrorsCodes.minLength,
                            `This field requires a value with a minimum length of ${parseInt(e.target.value, 10)}!`
                        ),
                        guide: newFieldGuide(
                            'sandboxField',
                            ValidationErrorsCodes.minLength,
                            `Please enter a value longer than ${parseInt(e.target.value, 10)} characters.`
                        )
                    })
                }
            />
        </div>
    )
}
