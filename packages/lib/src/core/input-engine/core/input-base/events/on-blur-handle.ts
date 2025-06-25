import { newEvent } from '@core/framework/events/new-event'
import { IConfigurationManager } from '@core/managers'
import { SConfigurationManager } from '@core/managers/configuration-manager/interfaces/i-configuration-manager'

import { IExtendedInput } from '../input-base.types'

export const onBlurHandle = (f: IExtendedInput) => {
    if (!f.input.validationManager?.triggerKeyWordType.includes('onBlur')) return

    // console.log('onBlurHandle', f.name, f.value)
    f.input.notificationManager?.debounceNotify(
        'onValidate',
        f.input.validationDelay,
        newEvent(f.input.name, onBlurHandle.name, 'onValidate', onBlurHandle.name, f.input.name, f)
    )
}
