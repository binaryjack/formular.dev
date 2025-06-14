import { IExtendedInput, IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { EventsType, IEvents } from './events.types'
import _toFlags from './to-flags'

export const newEvent = (
    fieldName: string,
    emitterName: string,
    type: EventsType,
    action: string,
    target?: string,
    fieldRef?: IExtendedInput | IInputBase
): IEvents => {
    return {
        fieldName,
        emitterName,
        action,
        types: [type],
        target,
        toFlags: () => _toFlags(fieldName, emitterName, [type], action, target),
        fieldRef
    }
}
