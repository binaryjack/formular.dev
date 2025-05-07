import { IAria, IDommable } from '@core/dommable/dommable.types'

export function dmAddArias<T extends HTMLElement>(this: IDommable<T>, id: string, arias: IAria[]) {
    const element = this.dmGet(id)
    if (!element) {
        this._tracker?.internalWarning(
            'Dommable.dmAddArias',
            `The element does not exist in references: ${id}`
        )
        return
    }
    for (const a of arias) {
        element.setAttribute(`aria-${a.name}`, a.value)
    }
}
