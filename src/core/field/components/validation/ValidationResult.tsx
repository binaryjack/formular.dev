import './ValidationResult.css'

import React, { useMemo } from 'react'

import { IValidationResult } from '../../validation/validator.types'

// Assuming IValidationResult is imported from the appropriate module

interface ValidationResultProps {
    validationResults: IValidationResult[]
}

const ValidationResultComponent: React.FC<ValidationResultProps> = ({ validationResults }) => {
    const valid = useMemo(
        () => validationResults.filter((result) => result.state),
        [validationResults]
    )

    return (
        <div className={`validation-result ${valid ? 'valid' : 'invalid'}`}>
            <div className={`validation-result-drawer`}>
                {validationResults.map((result, index) => {
                    return (
                        <div key={`${result.fieldName}-${index}`}>
                            {result.error && <div className="error">{result.error?.text}</div>}
                            {result.guide && <div className="guide">{result.guide?.text}</div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ValidationResultComponent
