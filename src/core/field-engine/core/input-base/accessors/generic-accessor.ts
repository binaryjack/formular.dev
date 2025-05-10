import { IFieldBaseInput } from '../field-input-base-types'

export const genericAccsssor = function <T extends Object>(backingPropertyName: string): () => T {
    return function (this: IFieldBaseInput) {
        try {
            const bp = this[backingPropertyName]
            if (!backingPropertyName || !bp) {
                throw Error(`${backingPropertyName} must be initialized`)
            }

            return bp
        } catch (e: any) {
            this.message('critical', genericAccsssor.name, `${e.message}`)
            return undefined
        }
    }
}
