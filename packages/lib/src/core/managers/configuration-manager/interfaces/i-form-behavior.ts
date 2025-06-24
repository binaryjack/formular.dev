import { EventsType } from '@core/framework'

export interface IFormBehavior {
    name: string
    enforceConfigurationCheck: true
    validationTriggers: EventsType[]
}
