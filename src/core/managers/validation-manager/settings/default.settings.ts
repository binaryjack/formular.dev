import { validatorMaxLengthStrategy } from '../strategies/validator-max-length-strategy'
import { validatorMaxStrategy } from '../strategies/validator-max-strategy'
import { validatorMinLengthStrategy } from '../strategies/validator-min-length-strategy'
import { validatorMinStrategy } from '../strategies/validator-min-strategy'
import { validatorRequiredStrategy } from '../strategies/validator-required-strategy'
import { validatorPatternStrategy } from '../strategies/vaslidator-pattern-strategy'
import { IValidationMethodStrategy } from '../validation-manager.types'

export const defaultValidationStrategies: IValidationMethodStrategy[] = [
    validatorMaxLengthStrategy,
    validatorMaxStrategy,
    validatorMinLengthStrategy,
    validatorMinStrategy,
    validatorRequiredStrategy,
    validatorPatternStrategy
]
