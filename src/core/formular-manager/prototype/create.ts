import { Formular } from '@core/formular-base/formular-base'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IFormular, IFormularManager } from '../formular-manager.types'

export default function createRaw(
    this: IFormularManager,
    name: string,
    autoTracker?: INotificationManager | undefined
): IFormular {
    const frm = new Formular(name, this, autoTracker)
    this.forms.set(frm.id, frm)
    return frm
}
