import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValidationManager } from '../interfaces/i-validation-manager'

export type IValidationStrategyType = (field: IInput) => IValidationManager
