import { EventsType } from '@core/framework/events/events.types'
import { IFieldSchemaBuilder } from '../field-schema-types'

export function setTriggerKeyWord(this: IFieldSchemaBuilder, triggerKeyWord: EventsType[]) {
    this.triggerKeyWord = triggerKeyWord
    return this
}
