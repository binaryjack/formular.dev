import { FieldInputStateType } from '@core/framework/common/common.input.state.types'
import { IStyleManager } from '../style-manager.types'

/**
 * Retrieves the class name associated with a specific field state.
 *
 * @param {FieldInputStateType} state - The state of the field to retrieve.
 * @returns {string} - The class name associated with the state.
 */
export function get(this: IStyleManager, state: FieldInputStateType): string {
    return this.classesList.get(state) ?? ''
}
