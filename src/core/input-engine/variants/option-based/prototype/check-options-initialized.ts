import { IOptionBaseInput } from '../option-base-input.types'

export const checkOptionsInitialized = function (this: IOptionBaseInput) {
    const intitializedOptions: boolean[] = []
    this.options.forEach((element) => {
        if (this.input.domManager?.dmExists(element.id!)) {
            intitializedOptions.push(true)
        }
    })
    return intitializedOptions.filter((o) => o).length === this.options.length
}
