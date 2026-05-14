import { InputClassStatesNamesType } from '@core/framework/common/common.input.state.types'
import { IStyleManager } from '../style-manager.types'

/**
 * Retrieves a list of all flags (field states) as an array.
 *
 * @returns {InputStateType[]} - An array of all field states.
 */
export function getFlagsList(this: IStyleManager): InputClassStatesNamesType[] {
    return Array.from(this.classesList.keys())
}
