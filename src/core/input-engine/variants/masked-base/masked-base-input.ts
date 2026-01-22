import { IMaskedBaseInput } from './masked-base-input.types'
import { initialize } from './prototype/initialize'
import { onChange } from './prototype/on-change'
import { onKeyPress } from './prototype/on-key-press'
import { onKeyUp } from './prototype/on-key-up'
import { ref } from './prototype/ref'
import { register } from './prototype/register'

export const MaskedBaseInput = function (this: IMaskedBaseInput, mask: string) {
    this.isInitialized = false
    // Debug logging
    // Try multiple logging approaches
    console.error('🔍 MaskedBaseInput constructor called - ERROR LOG')
    console.warn('🔍 MaskedBaseInput constructor called - WARN LOG')
    console.log('🔍 MaskedBaseInput constructor called - REGULAR LOG')
    // This will force a breakpoint if dev tools are open

    // In the debugger console while stopped at breakpoint
    console.log('mask:', mask)
    console.log('typeof mask:', typeof mask)
    console.log('Array.isArray(mask):', Array.isArray(mask))
    console.log('arguments:', arguments)
    console.log('arguments length:', arguments.length)

    console.log('🔍 MaskedBaseInput constructor called with:', {
        mask,
        type: typeof mask,
        isArray: Array.isArray(mask),
        arguments: Array.from(arguments)
    })

    // Handle potential array wrapping
    const actualMask = Array.isArray(mask) ? mask[0] : mask

    Object.defineProperty(this, 'mask', {
        value: actualMask,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    Object.defineProperty(this, 'dependencyName', {
        value: MaskedBaseInput.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as IMaskedBaseInput

Object.assign(MaskedBaseInput.prototype, {
    initialize,
    onChange,
    ref,
    onKeyPress,
    onKeyUp,
    register
})
