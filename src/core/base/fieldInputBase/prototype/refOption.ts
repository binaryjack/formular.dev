import { IFieldInput } from '../fieldInput.types'

/** In oposition to the above ref function the refOption function requires that the component manages the ref by itself
 * I guess (not sure at this point!) but I believe tha's because of the render nature.
 * as it's render through a [].MAP => if it's created by React.createRef the class is not aware of the ref itself
 * until the render is complete. And each render will create a new ref whitch is not what we want.
 *
 * In this case we provide a ref from the component itself and we add to the collection only if the ref has already
 * been created and the value (current) is referencing the input.
 *  */
export const refOption = function (this: IFieldInput, ref: HTMLInputElement | null) {
    if (!ref) return null
    /** Okay this following check after investigating is useless
     * I will keep it anyways because for me
     * it makes the code more readable and understandable
     * but it's does nothing at all since refs comes not null and only once
     *
     * I guessing that maybe a day if the render is dubbled
     * by the StrictMode of something else like that
     * we expect to have only one ref and it could avoid bugs
     */
    this.dmRegister(ref)
    if (this.optionsInitialized) return
    if (this.checkOptionsInitialized()) {
        this.setValue(this.defaultValue)
        this.optionsInitialized = true
    }

    // const existingRef = this.get(ref.id)
    // return existingRef

    // console.log('refOption', this.internalHTMLElementRefs)
}
