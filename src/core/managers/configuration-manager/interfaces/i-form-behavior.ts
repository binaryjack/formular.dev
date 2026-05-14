import { EventsType } from '@core/framework'

export interface IFormBehavior {
    name: string
    enforceConfigurationCheck: true
    validationTriggers: EventsType[]
    // Introspection settings (for dev/debug builds)
    enableIntrospection?: boolean
    debugStreamSize?: number // Ring buffer size for debug events
}
