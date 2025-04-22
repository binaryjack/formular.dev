import { conventions } from '../../../components/context/conventions/conventions'
import { Tracker } from '../tracker/tracker'
import { IDommable } from './dommable.types'

export const Dommable = function <T extends HTMLElement>(this: IDommable<T>) {
    this.elements = []
    Tracker.call(this)
} as any as IDommable<any>

Object.assign(Dommable.prototype, {
    ...Tracker.prototype,
    dmGet: function <T extends HTMLElement>(this: IDommable<T>, id: string) {
        return this.elements.find((o) => o.id === id) ?? null
    },
    dmExists: function <T extends HTMLElement>(this: IDommable<T>, id: string) {
        return !!this.elements.find((o) => o.id === id)
    },
    dmRegister: function <T extends HTMLElement>(this: IDommable<T>, element: T | null) {
        if (!element) return

        if (this.dmExists(element.id)) {
            this.internalWarning(
                'Dommable.register',
                `the element you try to add already exists: ${element.id}`
            )
            return
        }
        this.elements.push(element)
    },
    dmRegisterById: function <T extends HTMLElement>(this: IDommable<T>, id: string) {
        if (!id) return

        if (this.dmExists(id)) {
            return
        }
        const _tmpElement = document.getElementById(id) as T
        if (!_tmpElement) {
            this.internalWarning(
                'Dommable.registerById',
                `the element you try to reference doesn't exists in the DOM: ${id}`
            )
            return
        }
        this.elements.push(_tmpElement)
    },
    dmSetFocus: function <T extends HTMLElement>(this: IDommable<T>, id: string) {
        const ele = this.dmGet(id)
        if (!ele) {
            this.elements?.[0]?.focus()
        } else {
            ele.focus()
        }
    },
    dmSetEnabled: function <T extends HTMLElement>(
        this: IDommable<T>,
        id: string,
        enabled: boolean
    ) {
        const ele = this.dmGet(id)
        if (!ele) return
        if (!enabled) {
            ele?.blur?.()
        }
        ;(ele as unknown as HTMLInputElement).ariaDisabled = !enabled ? 'true' : 'false'
        ;(ele as unknown as HTMLInputElement).disabled = !enabled ? true : false
    },
    dmSetValue: function <T extends HTMLElement>(this: IDommable<T>, id: string, value: string) {
        const element = this.dmGet(id)
        if (!element) {
            this.internalError(
                'Dommable.dmSetValue',
                `the element does not exists in references: ${id}`
            )
            return
        }
        ;(element as unknown as HTMLInputElement).value = value
    },
    dmClear: function <T extends HTMLElement>(this: IDommable<T>) {
        for (const e of this.elements) {
            e.ariaChecked = 'false'
            ;(e as unknown as HTMLInputElement).value = ''
            ;(e as unknown as HTMLInputElement).checked = false
        }
    },
    dmSetChecked: function <T extends HTMLElement>(this: IDommable<T>, id: string, value: boolean) {
        const element = this.dmGet(id)
        if (!element) {
            this.internalError(
                'Dommable.dmSetChecked',
                `the element does not exists in references: ${id}`
            )
            return
        }
        ;(element as unknown as HTMLInputElement).checked = value
    },
    dmSetClass: function <T extends HTMLElement>(this: IDommable<T>, id: string, rules: string) {
        const element = this.dmGet(id)
        if (!element) {
            this.internalError(
                'Dommable.dmSetClass',
                `the element does not exists in references: ${id}`
            )
            return
        }
        ;(element as unknown as HTMLInputElement).className = rules
    },
    dmSetSelected: function <T extends HTMLElement>(
        this: IDommable<T>,
        id: string,
        selectionValue: string | null
    ) {
        const element = this.dmGet(id)
        if (!element) {
            this.internalError(
                'Dommable.dmSetSelected',
                `the element does not exists in references: ${id}`
            )
            return
        }
        ;(element as unknown as HTMLInputElement).value = selectionValue ?? ''
    },
    dmAriaSet: function <T extends HTMLElement>(this: IDommable<T>, id: string, name: string) {
        const element = this.dmGet(id)
        if (!element) {
            this.internalError(
                'Dommable.dmAriaSet',
                `the element does not exists in references: ${id}`
            )
            return
        }
        element.setAttribute('aria-labelledby', `${id}${conventions.suffix.labelId}`)
        element.setAttribute('name', name)
    }
})
