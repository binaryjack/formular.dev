import { INotification } from '@core/managers/notification-manager/notification-manager.types'
import { IInputBase } from '../input-base/input-base.types'

export type abstractInitializerSignatureType = <TInput extends IInputBase>(
    fieldInput: TInput,
    setup?: (fieldInput: TInput) => void,
    notifiers?: INotification[]
) => Promise<boolean>

export const abstractInitializer: abstractInitializerSignatureType = <
    TFieldInput extends IInputBase
>(
    fieldInput: TFieldInput,
    setup?: (fieldInput: TFieldInput) => void,
    notifiers?: INotification[]
) =>
    new Promise<boolean>((resolve, reject) => {
        try {
            setup?.(fieldInput)

            if (notifiers) {
                for (const n of notifiers) {
                    fieldInput.notificationManager?.accept(n)
                }
            }
            resolve(true)
        } catch (e: any) {
            reject(new Error(e.message))
        }
    })
