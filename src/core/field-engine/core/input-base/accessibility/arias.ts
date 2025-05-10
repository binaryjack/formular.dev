import { IAria } from '@core/managers/dom-manager/dom-manager.types'
import { IFieldInput } from '../field-input-base-types'

export interface IAriaHelper {
    new (): IAriaHelper
    arias: IAria[]
    add: (name: string, value: string) => void
    applyNameAndLabel: (f: IFieldInput) => void
    apply: (f: IFieldInput) => void
}

export const newAria = (name: string, value: string): IAria => {
    return { name, value }
}

export const AriaHelper = function (this: IAriaHelper) {
    this.arias = []
    this.add = function (this: IAriaHelper, name: string, value: string) {
        if (this.arias.find((o) => o.name === name)) {
            return
        }
        this.arias.push(newAria(name, value))
    }
    this.applyNameAndLabel = function (this: IAriaHelper, f: IFieldInput) {
        f.domManager?.dmAriaSet(f.id.toString(), f.name)
    }
    this.apply = function (this: IAriaHelper, f: IFieldInput) {
        f.domManager?.dmAddArias(f.id.toString(), this.arias)
    }
} as any as IAriaHelper
