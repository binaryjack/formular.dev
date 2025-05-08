import { INotifier } from '@core/notifiable-entity/notifications.types'
import { IFieldBaseInput } from '../field-input-base-types'

export type abstractInitializerSignatureType = <TFieldInput extends IFieldBaseInput>(
    caller: string,
    fieldInput: TFieldInput,
    setup?: (fieldInput: TFieldInput) => void,
    notifiers?: INotifier[]
) => Promise<boolean>

export const abstractInitializer: abstractInitializerSignatureType = <
    TFieldInput extends IFieldBaseInput
>(
    caller: string,
    fieldInput: TFieldInput,
    setup?: (fieldInput: TFieldInput) => void,
    notifiers?: INotifier[]
) =>
    new Promise<boolean>((resolve, reject) => {
        return function () {
            try {
                setup?.(fieldInput)

                if (notifiers) {
                    for (const n of notifiers) {
                        fieldInput.notifier?.accept(n)
                    }
                }
                resolve(true)
            } catch (e: any) {
                reject(new Error(e.message))
            }
        }
    })
