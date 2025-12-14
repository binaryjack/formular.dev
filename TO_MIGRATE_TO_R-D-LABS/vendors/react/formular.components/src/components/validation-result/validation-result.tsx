import { EventsType, IValidationResult } from 'formular.dev.lib'
// Import design system utilities
import { cx, generateValidationStyles } from 'formular.design.system'

import { useMemo } from 'react'

// Assuming IValidationResult is imported from the appropriate module

interface ValidationResultProps {
    validationResults: IValidationResult[]
    isFocus: boolean
}

const actionToDisplayError: EventsType[] = ['onBlur']
const actionToDisplayGuide: EventsType[] = ['onFocus', 'onChange']

const arrayHasOneOrMany = <T,>(source: T[], contains: T[]): boolean => {
    return source.filter((o) => contains.includes(o)).length > 0
}

const ValidationResultComponent = ({ validationResults, isFocus }: ValidationResultProps) => {
    const valid = useMemo(
        () => validationResults.every((result) => result.state),
        [validationResults.every((result) => result.state)]
    )

    if (valid) {
        return <></>
    }

    return (
        <div
            className={cx('validation-result', {
                valid: valid,
                invalid: !valid
            })}
        >
            <div className={`validation-result-drawer`}>
                {validationResults.map((result, index) => {
                    if (!result.triggerEventTypes) return null

                    const showError = arrayHasOneOrMany(
                        result.triggerEventTypes,
                        actionToDisplayError
                    )

                    const showGuide = arrayHasOneOrMany(
                        result.triggerEventTypes,
                        actionToDisplayGuide
                    )

                    return (
                        <div key={`${result.fieldName}-${index}`}>
                            {isFocus && showGuide && result.guide && (
                                <div className={generateValidationStyles('info')}>
                                    {result.guide}
                                </div>
                            )}

                            {!isFocus && showError && result.error && (
                                <div className={generateValidationStyles('error')}>
                                    {result.error}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ValidationResultComponent
