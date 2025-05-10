import { IDomManager } from './dom-manager.types'
import { dmAddArias } from './prototype/dm-add-arias'
import { dmAriaSet } from './prototype/dm-aria-set'
import { dmClear } from './prototype/dm-clear'
import { dmExists } from './prototype/dm-exists'
import { dmGet } from './prototype/dm-get'
import { dmRegister } from './prototype/dm-register'
import { dmRegisterById } from './prototype/dm-register-by-id'
import { dmSetChecked } from './prototype/dm-set-checked'
import { dmSetClass } from './prototype/dm-set-class'
import { dmSetEnabled } from './prototype/dm-set-enabled'
import { dmSetFocus } from './prototype/dm-set-focus'
import { dmSetSelected } from './prototype/dm-set-selected'
import { dmSetValue } from './prototype/dm-set-value'
import { initialize } from './prototype/initialize'

export const DomManager = function <T extends HTMLElement>(this: IDomManager<T>) {
    this.elements = []
    this.tracker = null
    this.isInitialized = false
    this.dependencyName = DomManager.name
} as any as IDomManager<any>

Object.assign(DomManager.prototype, {
    initialize,
    dmGet,
    dmExists,
    dmRegister,
    dmRegisterById,
    dmSetFocus,
    dmSetEnabled,
    dmSetValue,
    dmClear,
    dmSetChecked,
    dmSetClass,
    dmSetSelected,
    dmAddArias,
    dmAriaSet
})
