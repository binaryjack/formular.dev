import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import {
    IValidationOptions,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'

export interface IPatternProps {
    validationOptions: IValidationOptions
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const Pattern = ({ validationOptions, handleValidationOptionChange }: IPatternProps) => {
    return (
        <div className="flex px-2 flex-col w-full">
            <label htmlFor="pattern-v">Pattern:</label>{' '}
            <input
                id="pattern-v"
                type="text"
                value={validationOptions.pattern?.pattern ?? ''}
                onChange={(e) =>
                    handleValidationOptionChange('pattern', {
                        pattern: e.target.value,
                        error: newFieldError(
                            'sandboxField',
                            ValidationErrorsCodes.pattern,
                            `This field requires a value matching the pattern: ${e.target.value}`
                        ),
                        guide: newFieldGuide(
                            'sandboxField',
                            ValidationErrorsCodes.pattern,
                            `Please enter a value that matches the pattern: ${e.target.value}`
                        )
                    })
                }
            />
        </div>
    )
}
