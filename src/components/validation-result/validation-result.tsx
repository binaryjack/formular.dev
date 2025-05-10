import { EventsType } from '@core/framework/events/events.types'
import './validation-result.css'

import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import React, { useMemo } from 'react'

// Assuming IValidationResult is imported from the appropriate module

interface ValidationResultProps {
    validationResults: IValidationResult[]
}

const actionToDisplayError: EventsType[] = ['onBlur']
const actionToDisplayGuide: EventsType[] = ['onFocus', 'onChange']

const arrayHasOneOrMany = <T,>(source: T[], contains: T[]): boolean => {
    return source.filter((o) => contains.includes(o)).length > 0
}

const ValidationResultComponent: React.FC<ValidationResultProps> = ({ validationResults }) => {
    const valid = useMemo(
        () => validationResults.every((result) => result.state),
        [validationResults]
    )

    return (
        <div className={`validation-result ${valid ? 'valid' : 'invalid'}`}>
            <div className={`validation-result-drawer`}>
                {validationResults.map((result, index) => {
                    if (!result.strategyData?.origin?.types) return null

                    const showError = arrayHasOneOrMany(
                        result.strategyData?.origin?.types,
                        actionToDisplayError
                    )

                    const showGuide = arrayHasOneOrMany(
                        result.strategyData?.origin?.types,
                        actionToDisplayGuide
                    )

                    return (
                        <div key={`${result.fieldName}-${index}`}>
                            {showError && result.error && (
                                <div className="error">{result.error?.message}</div>
                            )}

                            {showGuide && result.guide && (
                                <div className="guide">{result.guide?.message}</div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ValidationResultComponent
