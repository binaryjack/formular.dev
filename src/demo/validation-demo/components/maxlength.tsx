import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import {
    IValidationOptions,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'

export interface IMaxLengthProps {
    validationOptions: IValidationOptions
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const MaxLength = ({ validationOptions, handleValidationOptionChange }: IMaxLengthProps) => {
    return (
        <div className="flex px-2 flex-col w-full">
            <label htmlFor="maxlength-v">Max Length:</label>{' '}
            <input
                id="maxlength-v"
                type="number"
                value={validationOptions.maxLength?.maxLength ?? ''}
                onChange={(e) =>
                    handleValidationOptionChange('maxLength', {
                        maxLength: parseInt(e.target.value, 10),
                        error: newFieldError(
                            'sandboxField',
                            ValidationErrorsCodes.maxLength,
                            `This field requires a value with a maximum length of ${parseInt(e.target.value, 10)}!`
                        ),
                        guide: newFieldGuide(
                            'sandboxField',
                            ValidationErrorsCodes.maxLength,
                            `Please enter a value shorter than ${parseInt(e.target.value, 10)} characters.`
                        )
                    })
                }
            />
        </div>
    )
}
