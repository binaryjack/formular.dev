import { ITracker } from '../tracker/tracker.types'
import { IDommable } from './dommable.types'
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

export const Dommable = function <T extends HTMLElement>(
    this: IDommable<T>,
    tracker: ITracker | null
) {
    this.elements = []
    this.tracker = tracker
} as any as IDommable<any>

Object.assign(Dommable.prototype, {
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
    dmAriaSet
})
