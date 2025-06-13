import { createMockDomManager } from './dom-manager.mock'
import { IDomManager } from './dom-manager.types'

const mockConfig = {
    /* mock IConfiguration properties as needed */
} as any

describe('createMockDomManager', () => {
    let manager: IDomManager<HTMLInputElement>
    let element: HTMLInputElement

    beforeEach(() => {
        manager = createMockDomManager({}, mockConfig)
        element = document.createElement('input')
        element.id = 'mock-input'
    })

    it('registers and retrieves an element', () => {
        manager.dmRegister(element)
        expect(manager.dmGet('mock-input')).toBe(element)
    })

    it('calls initialize with config', () => {
        const spy = jest.fn()
        const customManager = createMockDomManager({ initialize: spy }, mockConfig)
        customManager.initialize(mockConfig)
        expect(spy).toHaveBeenCalledWith(mockConfig)
    })

    it('allows method overrides', () => {
        const custom = createMockDomManager({ dmExists: () => true }, mockConfig)
        expect(custom.dmExists('anything')).toBe(true)
    })
})
