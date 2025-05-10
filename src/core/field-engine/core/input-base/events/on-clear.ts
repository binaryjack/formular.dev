import { IFieldBaseInput } from '../field-input-base-types'

export const onClear = (f: IFieldBaseInput, e: Event) => {
    console.log('onClear', f.name, f.value)
}
