import { IInput } from '../input-base.types'

export const setInputBusy = function (this: IInput, isBusy: boolean) {
    if (this.isBusy !== isBusy) {
        this.isBusy = isBusy
        this.styleManager?.update('busy', this.isBusy)
    }
}
