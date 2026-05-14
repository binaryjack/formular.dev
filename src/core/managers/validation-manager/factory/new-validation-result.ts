import { EventsType } from '@core/framework/events/events.types'
import { IValidationResult } from '../interfaces/i-validation-result'

export const newValidationResult = function (
    state: boolean,
    fieldName: string,
    code: string,
    triggerEventTypes: EventsType[],
    error?: string,
    guide?: string
): IValidationResult {
    return { state, fieldName, code, error, guide, triggerEventTypes }
}
