import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import {
    IValidationOptions,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'

export interface IMaxProps {
    validationOptions: IValidationOptions
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const Max = ({ validationOptions, handleValidationOptionChange }: IMaxProps) => {
    return (
        <div className="flex px-2 flex-col w-full">
            <label htmlFor="max-v">Max:</label>{' '}
            <input
                id="max-v"
                type="number"
                value={validationOptions.max?.value ?? ''}
                onChange={(e) =>
                    handleValidationOptionChange('max', {
                        max: parseInt(e.target.value, 10),
                        error: newFieldError(
                            'sandboxField',
                            ValidationErrorsCodes.max,
                            `This field requires a value that must not be greater than ${parseInt(e.target.value, 10)}!`
                        ),
                        guide: newFieldGuide(
                            'sandboxField',
                            ValidationErrorsCodes.max,
                            `Please enter a value less than ${parseInt(e.target.value, 10)}.`
                        )
                    })
                }
            />
        </div>
    )
}
