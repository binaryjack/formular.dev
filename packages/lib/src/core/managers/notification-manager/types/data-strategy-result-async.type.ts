import { IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '../../validation-manager/validation-manager.types'

export type DataStrategyResultAsyncType = (data: IEvents) => Promise<IValidationResult>
