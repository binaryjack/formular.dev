import { IOptionBaseInput } from '../option-based-input.types'

export const checkOptionsInitialized = function (this: IOptionBaseInput) {
    const intitializedOptions: boolean[] = []
    this.field.options.forEach((element) => {
        if (this.field.dmExists(element.id)) {
            intitializedOptions.push(true)
        }
    })
    return intitializedOptions.filter((o) => o).length === this.field.options.length
}
