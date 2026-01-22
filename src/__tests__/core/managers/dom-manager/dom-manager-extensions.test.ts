import { createMockDomManager } from '@core/managers/dom-manager/dom-manager.mock'

describe('DomManager Extensions', () => {
    let domManager: any

    beforeEach(() => {
        domManager = createMockDomManager()
    })

    describe('extend() method', () => {
        it('should fail initially - extend method does not exist yet', () => {
            // This test will FAIL until we implement the extend method
            expect(typeof domManager.extend).toBe('function')
        })

        it('should add extension methods to the manager instance', () => {
            // This test will FAIL until we implement the extend method
            const webComponentExtension = {
                createShadowRoot: function (
                    element: HTMLElement,
                    options: ShadowRootInit = { mode: 'open' }
                ) {
                    return element.attachShadow(options)
                }
            }

            domManager.extend('webComponents', webComponentExtension)

            expect(typeof domManager.createShadowRoot).toBe('function')
        })

        it('should track extension names', () => {
            // This test will FAIL until we implement hasExtension method
            const webComponentExtension = {
                createShadowRoot: function (
                    element: HTMLElement,
                    options: ShadowRootInit = { mode: 'open' }
                ) {
                    return element.attachShadow(options)
                }
            }

            domManager.extend('webComponents', webComponentExtension)

            expect(domManager.hasExtension('webComponents')).toBe(true)
            expect(domManager.hasExtension('nonExistent')).toBe(false)
        })

        it('should allow multiple extensions without conflicts', () => {
            const extension1 = {
                method1: function () {
                    return 'extension1'
                }
            }

            const extension2 = {
                method2: function () {
                    return 'extension2'
                }
            }

            domManager.extend('ext1', extension1)
            domManager.extend('ext2', extension2)

            expect(domManager.method1()).toBe('extension1')
            expect(domManager.method2()).toBe('extension2')
            expect(domManager.hasExtension('ext1')).toBe(true)
            expect(domManager.hasExtension('ext2')).toBe(true)
        })
    })

    describe('Web Component DOM Extension Methods', () => {
        beforeEach(() => {
            // Add the web component extension for testing
            const webComponentExtension = {
                createShadowRoot: function (
                    element: HTMLElement,
                    options: ShadowRootInit = { mode: 'open' }
                ) {
                    return element.attachShadow(options)
                },
                createTemplate: function (html: string, styles?: string) {
                    const template = document.createElement('template')
                    const content = styles ? `<style>${styles}</style>${html}` : html
                    template.innerHTML = content
                    return template
                },
                cloneTemplate: function (template: HTMLTemplateElement) {
                    return template.content.cloneNode(true)
                },
                registerComponent: function (this: any, componentId: string, element: HTMLElement) {
                    this.componentRegistry = this.componentRegistry ?? new Map()
                    this.componentRegistry.set(componentId, element)
                },
                getElementTree: function (this: any, element: HTMLElement, maxDepth: number = 5) {
                    const tree: any = {
                        tagName: element.tagName,
                        id: element.id,
                        className: element.className,
                        children: []
                    }

                    if (maxDepth > 0 && element.children.length > 0) {
                        for (let child of Array.from(element.children) as HTMLElement[]) {
                            tree.children.push(this.getElementTree(child, maxDepth - 1))
                        }
                    }

                    return tree
                }
            }

            // This will fail until extend() is implemented
            try {
                domManager.extend('webComponents', webComponentExtension)
            } catch {
                // Expected to fail initially - extend method doesn't exist yet
            }
        })

        it('should create shadow root for elements', () => {
            // Skip if extend is not implemented yet
            if (typeof domManager.extend !== 'function') {
                return // Skip test until extend() is implemented
            }

            const element = document.createElement('div')
            const shadowRoot = domManager.createShadowRoot(element, { mode: 'open' })

            expect(shadowRoot).toBeDefined()
            expect(element.shadowRoot).toBe(shadowRoot)
        })

        it('should create templates with HTML and optional styles', () => {
            if (typeof domManager.extend !== 'function') {
                return
            }

            const html = '<div class="component">Content</div>'
            const styles = '.component { color: red; }'

            const template = domManager.createTemplate(html, styles)

            expect(template.tagName).toBe('TEMPLATE')
            expect(template.innerHTML).toContain(html)
            expect(template.innerHTML).toContain(styles)
        })

        it('should clone templates', () => {
            if (typeof domManager.extend !== 'function') {
                return
            }

            const template = domManager.createTemplate('<div>Test</div>')
            const clone = domManager.cloneTemplate(template)

            expect(clone).toBeDefined()
            expect(clone.querySelector('div')?.textContent).toBe('Test')
        })

        it('should register and track components', () => {
            if (typeof domManager.extend !== 'function') {
                return
            }

            const element = document.createElement('my-component')
            domManager.registerComponent('test-component', element)

            expect(domManager.componentRegistry.get('test-component')).toBe(element)
        })

        it('should generate element tree structure', () => {
            if (typeof domManager.extend !== 'function') {
                return
            }

            const parent = document.createElement('div')
            parent.id = 'parent'
            parent.className = 'container'

            const child = document.createElement('span')
            child.textContent = 'Child'
            parent.appendChild(child)

            const tree = domManager.getElementTree(parent, 2)

            expect(tree.tagName).toBe('DIV')
            expect(tree.id).toBe('parent')
            expect(tree.className).toBe('container')
            expect(tree.children).toHaveLength(1)
            expect(tree.children[0].tagName).toBe('SPAN')
        })
    })
})
