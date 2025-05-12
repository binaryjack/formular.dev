import { IAria, IDomManager } from '../dom-manager.types'

export function dmAddArias<T extends HTMLElement>(
    this: IDomManager<T>,
    id: string,
    arias: IAria[]
) {
    const element = this.dmGet(id)
    if (!element) {
        this.tracker?.internalWarning(
            'DomManager.dmAddArias',
            `The element does not exist in references: ${id}`
        )
        return
    }
    for (const a of arias) {
        element.setAttribute(`aria-${a.name}`, a.value)
    }
}
