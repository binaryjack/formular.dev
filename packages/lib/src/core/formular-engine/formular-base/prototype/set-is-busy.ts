// set-is-busy.ts

import { LoadingStatus } from '@core/status'
import { IFormular } from '../formular-base.types'

/**
 * Sets the busy status of the Formular instance.
 * Updates the internal loading status which is exposed via the isBusy boolean getter.
 *
 * @param status - The loading status to set.
 */
export const setIsBusy = function <T extends object>(this: IFormular<T>, status: LoadingStatus) {
    ;(this as any)._loadingStatus = status
    // Trigger observers if needed
    // this.observers?.trigger()
}
