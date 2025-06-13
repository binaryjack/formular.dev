import { DomManager } from './dom-manager'

describe('DomManager', () => {
    let manager: any
    let element: HTMLInputElement

    beforeEach(() => {
        manager = new (DomManager as any)() // TypeScript workaround
        manager.initialize()
        element = document.createElement('input')
        element.id = 'test-input'
    })

    it('registers and retrieves an element', () => {
        manager.dmRegister(element)
        expect(manager.dmGet('test-input')).toBe(element)
    })

    it('returns null for non-existent element', () => {
        expect(manager.dmGet('not-exist')).toBeNull()
    })

    it('checks existence of an element', () => {
        manager.dmRegister(element)
        expect(manager.dmExists('test-input')).toBe(true)
        expect(manager.dmExists('not-exist')).toBe(false)
    })

    it('can clear registered elements', () => {
        manager.dmRegister(element)
        element.value = 'abc'
        element.checked = true
        manager.dmClear()
        expect(element.value).toBe('')
        expect(element.checked).toBe(false)
    })

    it('can set and get checked state', () => {
        manager.dmRegister(element)
        manager.dmSetChecked('test-input', true)
        expect(element.checked).toBe(true)
        manager.dmSetChecked('test-input', false)
        expect(element.checked).toBe(false)
    })

    it('can set class', () => {
        manager.dmRegister(element)
        manager.dmSetClass('test-input', 'foo')
        expect(element.className).toBe('foo')
    })

    it('can enable and disable element', () => {
        manager.dmRegister(element)
        manager.dmSetEnabled('test-input', false)
        expect(element.disabled).toBe(true)
        manager.dmSetEnabled('test-input', true)
        expect(element.disabled).toBe(false)
    })

    it('can set value', () => {
        manager.dmRegister(element)
        manager.dmSetValue('test-input', 'bar')
        expect(element.value).toBe('bar')
    })

    it('can set selected value', () => {
        manager.dmRegister(element)
        manager.dmSetSelected('test-input', 'baz')
        expect(element.value).toBe('baz')
    })

    it('can add ARIA attributes', () => {
        manager.dmRegister(element)
        manager.dmAddArias('test-input', [{ name: 'label', value: 'foo' }])
        expect(element.getAttribute('aria-label')).toBe('foo')
    })

    it('can set ARIA attribute', () => {
        manager.dmRegister(element)
        manager.dmAriaSet('test-input', 'bar')
        expect(element.getAttribute('aria-labelledby')).toBe('test-input-label')
        expect(element.getAttribute('name')).toBe('bar')
    })

    it('can update ARIA attribute', () => {
        manager.dmRegister(element)
        manager.dmUpdateAria('test-input', { name: 'role', value: 'button' })
        expect(element.getAttribute('aria-role')).toBe('button')
    })
})
