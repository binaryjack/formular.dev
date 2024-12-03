import './ValidationResult.css'

import React, { useMemo } from 'react'

import { IValidationResult } from '../../validation/validator.types'

// Assuming IValidationResult is imported from the appropriate module

interface ValidationResultProps {
    validationResults: IValidationResult[]
}

const ValidationResultComponent: React.FC<ValidationResultProps> = ({ validationResults }) => {
    const valid = useMemo(
        () => validationResults.every((result) => result.state),
        [validationResults]
    )

    console.log('VALID: ', valid ? 'YES' : 'NO')
    return (
        <div className={`validation-result ${valid ? 'valid' : 'invalid'}`}>
            <div className={`validation-result-drawer`}>
                {validationResults.map((result, index) => {
                    if (!result.strategyData?.origin?.fieldState) return null

                    const showError = ['onBlur'].includes(
                        result.strategyData?.origin?.fieldState ?? ''
                    )
                    const showGuide = ['onFocus', 'onChange'].includes(
                        result.strategyData?.origin?.fieldState ?? ''
                    )
                    console.log(
                        'result',
                        result.strategyData?.origin?.fieldState,
                        'showError',
                        showError,
                        'showGuide',
                        showGuide
                    )
                    return (
                        <div key={`${result.fieldName}-${index}`}>
                            {showError && result.error && (
                                <div className="error">{result.error?.text}</div>
                            )}

                            {showGuide && result.guide && (
                                <div className="guide">{result.guide?.text}</div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ValidationResultComponent
