import { IEvents } from './events.types'

export type eventSignature = <T extends IEvents>(data?: T) => void
