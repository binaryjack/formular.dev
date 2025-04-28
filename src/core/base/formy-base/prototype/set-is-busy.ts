// set-is-busy.ts

import { LoadingStatus } from '../../../status'
import { IFormy } from '../formy-base.types'

/**
 * Sets the busy status of the Formy instance.
 * @param status - The loading status to set.
 */
export function setIsBusy(this: IFormy, status: LoadingStatus) {
    this.isBusy = status
    // this.observers.trigger()
}
