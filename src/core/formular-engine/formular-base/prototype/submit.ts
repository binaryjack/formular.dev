import { newEvent } from '@core/framework/events/new-event'
import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { LoadingStatus } from '@core/status'
import { IFormular } from '../formular-base.types'

export const submit = async function <T extends object>(this: IFormular<T>): Promise<T | null> {
    this.setIsBusy(LoadingStatus.InProgress)
    return await new Promise<T | null>(async (resolve, reject) => {
        if (this.validateOnFirstSubmit) {
            this.validateOnFirstSubmit = false
        }

        const validationResults: IValidationResult[] = []

        for (const f of this.fields) {
            validationResults.push(
                ...(await f.input.handleValidationAsync(
                    newEvent(f.input.name, submit.name, 'onValidate', `submit`, f.input.name, f)
                ))
            )
        }
        const validFields: boolean[] = []

        validationResults.forEach((result: IValidationResult) => {
            validFields.push(result.state)
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
