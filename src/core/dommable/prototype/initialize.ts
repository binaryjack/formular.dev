import { ITracker } from '@core/tracker/tracker.types'
import { IDommable } from '../dommable.types'

export const initialize = function <T extends HTMLElement>(this: IDommable<T>, tracker: ITracker) {
    this._tracker = tracker
}
