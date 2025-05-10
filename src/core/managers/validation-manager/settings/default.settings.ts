import { ValidatorMaxLengthStrategy } from '../strategies/validator-max-length-strategy'
import { ValidatorMaxStrategy } from '../strategies/validator-max-strategy'
import { ValidatorMinLengthStrategy } from '../strategies/validator-min-length-strategy'
import { ValidatorMinStrategy } from '../strategies/validator-min-strategy'
import { ValidatorRequiredStrategy } from '../strategies/validator-required-strategy'
import { ValidatorPatternStrategy } from '../strategies/vaslidator-pattern-strategy'
import { IValidationMethodStrategy } from '../validation-manager.types'

export const defaultValidationStrategies: IValidationMethodStrategy[] = [
    ValidatorMaxLengthStrategy,
    ValidatorMaxStrategy,
    ValidatorMinLengthStrategy,
    ValidatorMinStrategy,
    ValidatorRequiredStrategy,
    ValidatorPatternStrategy
]
