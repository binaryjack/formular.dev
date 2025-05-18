import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { LoadingStatus } from '@core/status'
import { IFormular } from '../formular-base.types'

export const submit = async function <T extends object>(this: IFormular<T>): Promise<T | null> {
    this.setIsBusy(LoadingStatus.InProgress)
    return await new Promise<T | null>((resolve, reject) => {
        if (this.validateOnFirstSubmit) {
            this.validateOnFirstSubmit = false
        }
        this.fields.forEach((f: IExtendedInput) => {
            f.input.handleValidation(
                newEvent(f.input.name, submit.name, 'onValidate', `submit`, f.input.name, f)
            )
        })
        const validFields: boolean[] = []

        this.fields.forEach((f: IExtendedInput) => {
            validFields.push(f.input.isValid)
        })

        if (validFields.every((result) => result)) {
            this.setIsBusy(LoadingStatus.Loaded)
            resolve(this.getData() as T)
        } else {
            this.setIsBusy(LoadingStatus.Error)
            reject(new Error('Form is not valid'))
        }
    })
}
