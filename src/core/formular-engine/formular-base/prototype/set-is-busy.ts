// set-is-busy.ts

import { LoadingStatus } from '@core/status'
import { IFormular } from '../formular-base.types'

/**
 * Sets the busy status of the Formy instance.
 * @param status - The loading status to set.
 */
export const setIsBusy = function <T extends object>(this: IFormular<T>, status: LoadingStatus) {
    this.isBusy = status
    // this.observers.trigger()
}
