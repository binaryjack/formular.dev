import { newEvent } from '@core/framework/events/new-event'
import { IInput } from '../input-base.types'

export const setInputBusy = function (this: IInput, isBusy: boolean) {
    if (this.isBusy !== isBusy) {
        this.isBusy = isBusy
        this.styleManager?.update('busy', this.isBusy)

        // Notify observers about the state change
        this.notificationManager?.notify(
            'onUiUpdate',
            newEvent(
                this.name,
                setInputBusy.name,
                'onUiUpdate',
                `field.${setInputBusy.name}`,
                this.name
            )
        )
    }
}
