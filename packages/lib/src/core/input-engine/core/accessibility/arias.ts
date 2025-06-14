import { IAria } from '@core/managers/dom-manager/dom-manager.types'
import { IInput } from '../input-base/input-base.types'

export interface IAriaHelper {
    new (): IAriaHelper
    arias: IAria[]
    add: (name: string, value: string) => void
    addMany: (...arias: IAria[]) => void
    apply: (f: IInput) => void
}

export const aria = (name: string, value: string): IAria => {
    return { name, value }
}

export const AriaHelper = function (this: IAriaHelper) {
    this.arias = []
    this.addMany = function (this: IAriaHelper, ...arias: IAria[]) {
        for (const a of arias) {
            if (this.arias.find((o) => o.name === a.name)) {
                continue
            }
            this.arias.push(a)
        }
    }
    this.add = function (this: IAriaHelper, name: string, value: string) {
        if (this.arias.find((o) => o.name === name)) {
            return
        }
        this.arias.push(aria(name, value))
    }
    this.apply = function (this: IAriaHelper, f: IInput) {
        f.domManager?.dmAddArias(f.id.toString(), this.arias)
    }
} as any as IAriaHelper
