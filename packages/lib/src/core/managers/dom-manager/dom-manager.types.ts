import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { ITrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { IServiceInjectableProperties } from '@core/types'

import { IInitializableDependency } from '../initialization-manager/initialization-manager.types'
import { IServiceManager } from '../types'

export const SDomManager = Symbol.for('IDomManager')

export interface IAria {
    name: string
    value: string
}

export type IDomManager<T extends HTMLElement> = IDomManagerBase<T> & ITrackingManager

export interface IDomManagerBase<T extends HTMLElement>
    extends IInitializableDependency,
        IServiceInjectableProperties {
    new (serviceManager: IServiceManager): IDomManager<T>
    elements: T[]
    tracker: ITrackingManager | null
    internalHTMLElementRef: HTMLInputElement[] | null

    ref: (o: HTMLInputElement | null) => void
    dmSetFocus: (id: string) => void
    dmRegister: (element: T | null) => void
    dmRegisterById: (id: string) => void
    dmGet: (id: string) => T | null
    dmExists: (id: string) => boolean
    dmSetValue: (id: string, value: InputDataTypes) => void
    dmClear: () => void
    dmSetChecked: (id: string, value: boolean) => void
    dmSetClass: (id: string, rules: CSSPropertyRule) => void
    dmSetEnabled: (id: string, enabled: boolean) => void
    dmSetSelected: (id: string, selectionValue: string | null) => void
    dmAriaSet: (id: string, name: string) => void
    dmAddArias: (id: string, arias: IAria[]) => void
    dmUpdateAria: <T extends HTMLElement>(id: string, aria: IAria) => void
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
