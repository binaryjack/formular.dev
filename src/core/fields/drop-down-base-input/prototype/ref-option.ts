import { optionReferencer } from '@core/fields/field-base-input/referencers/referencer'
import { IDropDownInput } from '../drop-down-base-input.types'

/** In oposition to the above ref function the refOption function requires that the component manages the ref by itself
 * I guess (not sure at this point!) but I believe tha's because of the render nature.
 * as it's render through a [].MAP => if it's created by React.createRef the class is not aware of the ref itself
 * until the render is complete. And each render will create a new ref whitch is not what we want.
 *
 * In this case we provide a ref from the component itself and we add to the collection only if the ref has already
 * been created and the value (current) is referencing the input.
 *  */
export const refOption = function (this: IDropDownInput, ref: HTMLInputElement | null) {
    optionReferencer(this, ref)
}
