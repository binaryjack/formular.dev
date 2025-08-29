import { defaultStates } from '../../../../../default/default-states'
import { ComponentsTypes } from '../../../../../types/enums/components-enum'
import { IStates } from '../../../../../types/interfaces/i-states'
import { IStatesConfig } from '../../../../../types/interfaces/i-states-config'

export const stateResolver = (componentType: ComponentsTypes, states?: IStatesConfig): string => {
    if (!states) return ''
    /** COPILOT: Resolve this  */
    const output: IStates = { ...defaultStates }

    if (states.hasDisable) {
        output.disabled = `${componentType}-disabled`
    }
    if (states.hasErrors) {
        output.errors = `${componentType}-error`
    }
    if (states.hasFocused) {
        output.focused = `focus:${componentType}-focus`
    }
    if (states.hasHover) {
        output.hover = `hover:${componentType}-hover`
    }
    if (states.hasPressed) {
        output.pressed = `pressed:${componentType}-pressed`
    }
    if (states.hasRing) {
        output.ring = `ring:${componentType}-ring`
    }
    return Object.values(output)
        .map(o => o)
        .filter(o => !!o)
        .join(' ')
}
