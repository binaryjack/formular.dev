import { IFieldInput } from '../fieldInput.types'

export const hasChanges = function (this: IFieldInput, callback: () => void) {
    this.observers.subscribe(callback)
}
