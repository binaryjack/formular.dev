import { IOptionInput } from '../option-base-input.types'

export const checkOptionsInitialized = function (this: IOptionInput) {
    const intitializedOptions: boolean[] = []
    this.options.forEach((element) => {
        if (this.field().dom()?.dmExists(element.id)) {
            intitializedOptions.push(true)
        }
    })
    return intitializedOptions.filter((o) => o).length === this.options.length
}
