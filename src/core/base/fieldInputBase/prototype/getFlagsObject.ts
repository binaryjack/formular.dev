import { IFieldInput } from '../fieldInput.types'

/**
 * Retrieves the flags object associated with the current field input.
 *
 * This method delegates the call to the `getFlagsObject` method of the
 * `fieldStateStyle` property, which is expected to handle the logic for
 * generating or returning the flags object.
 *
 * @returns An object representing the flags for the current field input.
 */
export const getFlagsObject = function (this: IFieldInput) {
    return this.fieldStateStyle.getFlagsObject()
}
