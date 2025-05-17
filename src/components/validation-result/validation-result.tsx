import { EventsType } from '@core/framework/events/events.types'
import './validation-result.css'

import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
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

    console.log('ValidationResultComponent focus', isFocus)

    if (valid) {
        return <></>
    }

    return (
        <div className={`validation-result ${valid ? 'valid' : 'invalid'}`}>
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
                                <div className="guide">{result.guide?.message}</div>
                            )}

                            {!isFocus && showError && result.error && (
                                <div className="error">{result.error?.message}</div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ValidationResultComponent
