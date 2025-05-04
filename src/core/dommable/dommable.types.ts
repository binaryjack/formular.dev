import { FieldDataTypes } from '@core/framework/schema/descriptor/field.data.types'
import { ITracker } from '@core/tracker/tracker.types'

export interface IAria {
    name: string
    value: string
}

export type IDommable<T extends HTMLElement> = IDommableBase<T> & ITracker

export interface IDommableBase<T extends HTMLElement> {
    new (tracker: ITracker | null): IDommable<T>
    elements: T[]
    _tracker: ITracker | null
    internalHTMLElementRef: HTMLInputElement[] | null
    ref: (o: HTMLInputElement | null) => void
    dmSetFocus: (id: string) => void
    dmRegister: (element: T | null) => void
    dmRegisterById: (id: string) => void
    dmGet: (id: string) => T | null
    dmExists: (id: string) => boolean
    dmSetValue: (id: string, value: FieldDataTypes) => void
    dmClear: () => void
    dmSetChecked: (id: string, value: boolean) => void
    dmSetClass: (id: string, rules: CSSPropertyRule) => void
    dmSetEnabled: (id: string, enabled: boolean) => void
    dmSetSelected: (id: string, selectionValue: string | null) => void
    dmAriaSet: (id: string, name: string) => void
    dmAddArias: (id: string, arias: IAria[]) => void
}
export const DomUtils = {
    getElementById: (id: string): HTMLElement | null => document.getElementById(id),
    focusElement: (element: HTMLElement | null) => {
        if (element) element.focus()
    },
    clearElement: (element: HTMLInputElement | null) => {
        if (element) element.value = ''
    }
}
