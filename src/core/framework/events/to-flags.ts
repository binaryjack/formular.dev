import { EventsType } from './events.types'

const _toFlags = function (
    fieldName: string,
    emitterName: string,
    types: EventsType[],
    action: string,
    target?: string
) {
    return `${fieldName}.${emitterName}:[${types.join(',')}].[${action}]${target ? ' => [' + target + ']' : ''}`
}

export default _toFlags
