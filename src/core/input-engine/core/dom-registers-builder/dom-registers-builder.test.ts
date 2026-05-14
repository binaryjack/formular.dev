import { DomRegisterBuilder } from './dom-registers-builder'

describe('DomRegisterBuilder', () => {
    const mockContext = {
        input: { id: 'test', type: 'text', label: 'Test Label' },
        dependencyName: ''
    } as any

    it('should register and merge event handlers', () => {
        const builder = new DomRegisterBuilder(mockContext)
        const handler1 = jest.fn()
        const handler2 = jest.fn()
        builder.registerEvent('onChange', handler1)
        builder.registerEvent('onChange', handler2)
        const handlers = builder.assembleEventsHandlers()
        handlers.onChange({} as Event)
        expect(handler1).toHaveBeenCalled()
        expect(handler2).toHaveBeenCalled()
    })

    it('should build input config with correct id and type', () => {
        const builder = new DomRegisterBuilder(mockContext)
        const config = builder.build()
        expect(config.id).toBe('test')
        expect(config.type).toBe('text')
        expect(config.className).toBe('base-input')
        expect(config.title).toBe('Test Label')
    })

    it('should allow chaining of event registration', () => {
        const builder = new DomRegisterBuilder(mockContext)
        expect(() =>
            builder.registerChange().registerBlur().registerFocus().registerClick()
        ).not.toThrow()
    })
})
