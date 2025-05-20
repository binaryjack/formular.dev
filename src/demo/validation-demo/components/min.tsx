import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import {
    IValidationOptions,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'

export interface IMinProps {
    validationOptions: IValidationOptions
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const Min = ({ validationOptions, handleValidationOptionChange }: IMinProps) => {
    return (
        <div className="flex px-2  flex-col w-full">
            <label htmlFor="min-v">Min:</label>{' '}
            <input
                id="min-v"
                type="number"
                value={validationOptions.min?.min ?? ''}
                onChange={(e) =>
                    handleValidationOptionChange('min', {
                        min: parseInt(e.target.value, 10),
                        error: newFieldError(
                            'sandboxField',
                            ValidationErrorsCodes.min,
                            `This field requires a value that must not be less than ${parseInt(e.target.value, 10)}!`
                        ),
                        guide: newFieldGuide(
                            'sandboxField',
                            ValidationErrorsCodes.min,
                            `please enter a value greater than ${parseInt(e.target.value, 10)}.`
                        )
                    })
                }
            />
        </div>
    )
}
