import { IFieldInput } from '../fieldInput.types'

export const checkOptionsInitialized = function (this: IFieldInput) {
    const intitializedOptions: boolean[] = []
    this.options.forEach((element) => {
        if (this.dmExists(element.id)) {
            intitializedOptions.push(true)
        }
    })
    return intitializedOptions.filter((o) => o).length === this.options.length
}
