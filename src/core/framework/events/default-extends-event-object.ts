import { IEvents } from './events.types'
import _toFlags from './to-flags'

export const defaultExtendsEventObject: IEvents = {
    action: '',
    emitterName: '',
    fieldName: '',
    types: ['intitial'],
    toFlags: () => _toFlags('', '', ['intitial'], '')
}
