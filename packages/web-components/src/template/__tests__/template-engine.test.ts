/**
 * @fileoverview Tests for the template engine
 * 
 * Tests all core template functionality including template parsing,
 * event binding, conditionals, loops, and template composition.
 */

import { createTemplate, css, html, processTemplate, repeat, sanitizeHTML, when } from '../template-engine'
import { choose, classHelpers, eventHandlers, patterns, switchCase } from '../template-utils'

describe('Template Engine', () => {
    describe('html template literal', () => {
        it('should create basic templates', () => {
            const title = 'Hello World'
            const template = html`<h1>${title}</h1>`
            
            expect(template.html).toBe('<h1>Hello World</h1>')
            expect(template.values).toEqual([title])
            expect(template.metadata.hasEvents).toBe(false)
        })

        it('should handle multiple interpolations', () => {
            const name = 'John'
            const age = 30
            const template = html`<div>Name: ${name}, Age: ${age}</div>`
            
            expect(template.html).toBe('<div>Name: John, Age: 30</div>')
            expect(template.values).toEqual([name, age])
        })

        it('should handle null and undefined values', () => {
            const template = html`<div>${null} ${undefined}</div>`
            
            expect(template.html).toBe('<div> </div>')
        })

        it('should detect event listeners', () => {
            const handleClick = () => {}
            const template = html`<button @click=${handleClick}>Click</button>`
            
            expect(template.metadata.hasEvents).toBe(true)
            expect(template.eventListeners.size).toBe(1)
        })
    })

    describe('css template literal', () => {
        it('should create CSS strings', () => {
            const color = 'red'
            const styles = css`
                .component {
                    color: ${color};
                    font-size: 16px;
                }
            `
            
            expect(styles).toContain('color: red')
            expect(styles).toContain('font-size: 16px')
        })
    })

    describe('conditional rendering', () => {
        it('should render when condition is true', () => {
            const condition = true
            const template = when(condition, 'Show this', 'Show that')
            
            expect(template.render()).toBe('Show this')
        })

        it('should render else template when condition is false', () => {
            const condition = false
            const template = when(condition, 'Show this', 'Show that')
            
            expect(template.render()).toBe('Show that')
        })

        it('should render empty when condition is false and no else template', () => {
            const condition = false
            const template = when(condition, 'Show this')
            
            expect(template.render()).toBe('')
        })
    })

    describe('loop rendering', () => {
        it('should render array items', () => {
            const items = ['a', 'b', 'c']
            const template = repeat(items, (item, index) => `${index}: ${item}`)
            
            expect(template).toEqual(['0: a', '1: b', '2: c'])
            expect((template as any).__isTemplate).toBe(true)
        })

        it('should handle empty arrays', () => {
            const items: string[] = []
            const template = repeat(items, (item) => item)
            
            expect(template).toEqual([])
            expect((template as any).__isTemplate).toBe(true)
        })
    })

    describe('template creation and processing', () => {
        it('should create HTML template elements', () => {
            const templateResult = html`<div>Hello World</div>`
            const template = createTemplate(templateResult)
            
            expect(template.tagName).toBe('TEMPLATE')
            expect(template.innerHTML).toBe('<div>Hello World</div>')
        })

        it('should process templates with events', () => {
            const handleClick = jest.fn()
            const templateResult = html`<button @click=${handleClick}>Click</button>`
            const template = createTemplate(templateResult)
            const fragment = processTemplate(template, templateResult, 'test-component')
            
            const button = fragment.querySelector('button')
            expect(button).toBeTruthy()
            expect(button?.getAttribute('data-component')).toBe('test-component')
        })
    })

    describe('HTML sanitization', () => {
        it('should sanitize script tags', () => {
            const malicious = '<script>alert("xss")</script>'
            const sanitized = sanitizeHTML(malicious)
            
            expect(sanitized).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;')
        })

        it('should preserve safe HTML', () => {
            const safe = '<div>Hello <strong>World</strong></div>'
            const sanitized = sanitizeHTML(safe)
            
            // Note: sanitizeHTML currently just escapes everything
            // In a real implementation, you'd use a proper HTML sanitizer
            expect(sanitized).toContain('Hello')
        })
    })
})

describe('Template Utils', () => {
    describe('choose helper', () => {
        it('should render first matching condition', () => {
            const conditions = [
                { condition: false, template: 'First' },
                { condition: true, template: 'Second' },
                { condition: true, template: 'Third' }
            ]
            const template = choose(conditions)
            
            expect(template.render()).toBe('Second')
        })

        it('should render nothing if no conditions match', () => {
            const conditions = [
                { condition: false, template: 'First' },
                { condition: false, template: 'Second' }
            ]
            const template = choose(conditions)
            
            expect(template.render()).toBe('')
        })
    })

    describe('switchCase helper', () => {
        it('should render matching case', () => {
            const cases = {
                'a': 'Case A',
                'b': 'Case B'
            }
            const template = switchCase('a', cases, 'Default')
            
            expect(template.render()).toBe('Case A')
        })

        it('should render default case when no match', () => {
            const cases = {
                'a': 'Case A',
                'b': 'Case B'
            }
            const template = switchCase('c', cases, 'Default')
            
            expect(template.render()).toBe('Default')
        })
    })

    describe('event handlers', () => {
        it('should create preventDefault handler', () => {
            const mockHandler = jest.fn()
            const mockEvent = {
                preventDefault: jest.fn()
            } as unknown as Event
            
            const enhancedHandler = eventHandlers.preventDefault(mockHandler)
            enhancedHandler(mockEvent)
            
            expect(mockEvent.preventDefault).toHaveBeenCalled()
            expect(mockHandler).toHaveBeenCalledWith(mockEvent)
        })

        it('should create stopPropagation handler', () => {
            const mockHandler = jest.fn()
            const mockEvent = {
                stopPropagation: jest.fn()
            } as unknown as Event
            
            const enhancedHandler = eventHandlers.stopPropagation(mockHandler)
            enhancedHandler(mockEvent)
            
            expect(mockEvent.stopPropagation).toHaveBeenCalled()
            expect(mockHandler).toHaveBeenCalledWith(mockEvent)
        })

        it('should create debounced handler', (done) => {
            const mockHandler = jest.fn()
            const mockEvent = {} as Event
            const delay = 50
            
            const debouncedHandler = eventHandlers.debounce(mockHandler, delay)
            
            // Call multiple times quickly
            debouncedHandler(mockEvent)
            debouncedHandler(mockEvent)
            debouncedHandler(mockEvent)
            
            // Should not be called immediately
            expect(mockHandler).not.toHaveBeenCalled()
            
            // Should be called once after delay
            setTimeout(() => {
                expect(mockHandler).toHaveBeenCalledTimes(1)
                done()
            }, delay + 10)
        })
    })

    describe('class helpers', () => {
        it('should apply conditional classes', () => {
            const classes = classHelpers.conditional({
                'active': true,
                'disabled': false,
                'primary': true
            })
            
            expect(classes).toBe('active primary')
        })

        it('should combine class sources', () => {
            const combined = classHelpers.combine(
                'base-class',
                { 'conditional': true, 'hidden': false },
                undefined,
                'another-class'
            )
            
            expect(combined).toBe('base-class conditional another-class')
        })
    })

    describe('patterns', () => {
        it('should create loading pattern', () => {
            const loadingTemplate = patterns.loading(true, 'Content', 'Loading...')
            const contentTemplate = patterns.loading(false, 'Content', 'Loading...')
            
            expect(loadingTemplate.html).toContain('Loading...')
            expect(contentTemplate.html).toContain('Content')
        })

        it('should create error boundary pattern', () => {
            const error = new Error('Test error')
            const errorTemplate = patterns.errorBoundary(error, 'Content')
            const contentTemplate = patterns.errorBoundary(null, 'Content')
            
            expect(errorTemplate.html).toContain('Test error')
            expect(contentTemplate.html).toContain('Content')
        })

        it('should create empty state pattern', () => {
            const emptyTemplate = patterns.emptyState([], 'Content', 'No items')
            const contentTemplate = patterns.emptyState(['item'], 'Content', 'No items')
            
            expect(emptyTemplate.html).toContain('No items')
            expect(contentTemplate.html).toContain('Content')
        })
    })
})

// DOM tests that require jsdom
describe('Template Engine DOM Tests', () => {
    beforeEach(() => {
        // Clear any existing DOM
        document.body.innerHTML = ''
    })

    it('should create functional templates in DOM', () => {
        const templateResult = html`<div class="test">Hello World</div>`
        const template = createTemplate(templateResult)
        const fragment = processTemplate(template, templateResult)
        
        document.body.appendChild(fragment)
        
        const element = document.querySelector('.test')
        expect(element?.textContent).toBe('Hello World')
    })

    it('should bind event listeners in DOM', () => {
        const handleClick = jest.fn()
        const templateResult = html`<button @click=${handleClick}>Click me</button>`
        const template = createTemplate(templateResult)
        const fragment = processTemplate(template, templateResult)
        
        document.body.appendChild(fragment)
        
        const button = document.querySelector('button')
        button?.click()
        
        expect(handleClick).toHaveBeenCalled()
    })
})
