/**
 * Manager Factory Integration Tests
 * Testing the complete manager factory system
 */

import { createWebComponentManagers, validateWebComponentManagers } from '../manager-factory'

describe('Manager Factory Integration', () => {
    let managers: any

    beforeEach(() => {
        managers = createWebComponentManagers({
            enableDebugMode: false, // Disable for testing
            batchUpdateDelay: 1 // Fast updates for testing
        })
    })

    afterEach(() => {
        // Cleanup any created managers
        managers = null
    })

    describe('Manager Creation', () => {
        it('should create all required managers', () => {
            expect(managers).toBeDefined()
            expect(managers.domManager).toBeDefined()
            expect(managers.styleManager).toBeDefined()
            expect(managers.notificationManager).toBeDefined()
            expect(managers.reactiveManager).toBeDefined()
        })

        it('should initialize all managers', () => {
            expect(managers.domManager.isInitialized).toBe(true)
            expect(managers.styleManager.isInitialized).toBe(true)
            expect(managers.notificationManager.isInitialized).toBe(true)
            expect(managers.reactiveManager.isInitialized).toBe(true)
        })

        it('should have web component extensions loaded', () => {
            expect(managers.domManager.hasExtension('webComponents')).toBe(true)
            expect(managers.styleManager.hasExtension('webComponents')).toBe(true)
            expect(managers.notificationManager.hasExtension('webComponents')).toBe(true)
        })
    })

    describe('DOM Manager Extensions', () => {
        it('should have createShadowRoot method', () => {
            expect(typeof managers.domManager.createShadowRoot).toBe('function')
        })

        it('should have createTemplate method', () => {
            expect(typeof managers.domManager.createTemplate).toBe('function')
        })

        it('should have registerComponent method', () => {
            expect(typeof managers.domManager.registerComponent).toBe('function')
        })

        it('should create and track templates', () => {
            const template = managers.domManager.createTemplate('<div>Test</div>', '', 'test-template')
            expect(template).toBeInstanceOf(HTMLTemplateElement)
            expect(template.innerHTML).toContain('<div>Test</div>')
        })

        it('should register and track components', () => {
            const element = document.createElement('div')
            managers.domManager.registerComponent('test-component', element)
            
            const registration = managers.domManager.getComponentRegistration('test-component')
            expect(registration).toBeDefined()
            expect(registration.id).toBe('test-component')
            expect(registration.element).toBe(element)
        })
    })

    describe('Style Manager Extensions', () => {
        it('should have addComponentStyles method', () => {
            expect(typeof managers.styleManager.addComponentStyles).toBe('function')
        })

        it('should have setCSSVariable method', () => {
            expect(typeof managers.styleManager.setCSSVariable).toBe('function')
        })

        it('should have applyTheme method', () => {
            expect(typeof managers.styleManager.applyTheme).toBe('function')
        })

        it('should manage CSS variables globally', () => {
            managers.styleManager.setCSSVariable('test-color', '#ff0000', 'global')
            const value = managers.styleManager.getCSSVariable('test-color', 'global')
            expect(value).toBe('#ff0000')
        })

        it('should register and apply themes', () => {
            const theme = {
                'primary-color': '#007bff',
                'secondary-color': '#6c757d'
            }
            
            managers.styleManager.registerTheme('test-theme', theme, 'Test theme')
            managers.styleManager.applyTheme('test-theme', 'global')
            
            const themes = managers.styleManager.getAvailableThemes()
            expect(themes).toHaveLength(1)
            expect(themes[0].name).toBe('test-theme')
        })
    })

    describe('Notification Manager Extensions', () => {
        it('should have showComponentDebug method', () => {
            expect(typeof managers.notificationManager.showComponentDebug).toBe('function')
        })

        it('should have notifyLifecycle method', () => {
            expect(typeof managers.notificationManager.notifyLifecycle).toBe('function')
        })

        it('should have setGlobalDebugMode method', () => {
            expect(typeof managers.notificationManager.setGlobalDebugMode).toBe('function')
        })

        it('should configure component notifications', () => {
            managers.notificationManager.configureComponent('test-component', {
                enableDebug: true,
                logLevel: 'info',
                maxHistorySize: 50
            })

            managers.notificationManager.showComponentDebug('test-component', 'test event', { test: 'data' })
            
            const notifications = managers.notificationManager.getComponentNotifications('test-component')
            expect(notifications).toHaveLength(1)
            expect(notifications[0].message).toContain('test event')
        })

        it('should track lifecycle events', () => {
            managers.notificationManager.notifyLifecycle('test-component', 'connected', { start: 0, end: 10 })
            
            const notifications = managers.notificationManager.getComponentNotifications('test-component')
            const lifecycleNotification = notifications.find(n => n.type === 'lifecycle')
            expect(lifecycleNotification).toBeDefined()
            expect(lifecycleNotification?.data.phase).toBe('connected')
        })
    })

    describe('Reactive Manager', () => {
        it('should be properly initialized', () => {
            expect(managers.reactiveManager.isInitialized).toBe(true)
        })

        it('should have createReactiveProperty method', () => {
            expect(typeof managers.reactiveManager.createReactiveProperty).toBe('function')
        })

        it('should have createComputed method', () => {
            expect(typeof managers.reactiveManager.createComputed).toBe('function')
        })

        it('should create reactive properties', () => {
            const element = document.createElement('div')
            
            managers.reactiveManager.createReactiveProperty(
                element,
                'testProp',
                {
                    initialValue: 'initial',
                    type: 'string',
                    attribute: true
                },
                'test-component'
            )

            expect((element as any).testProp).toBe('initial')
            
            // Test reactivity
            ;(element as any).testProp = 'updated'
            expect((element as any).testProp).toBe('updated')
        })
    })

    describe('Manager Validation', () => {
        it('should validate properly configured managers', () => {
            const validation = validateWebComponentManagers(managers)
            expect(validation.isValid).toBe(true)
            expect(validation.errors).toHaveLength(0)
        })

        it('should detect missing extensions', () => {
            const invalidManagers = {
                domManager: { hasExtension: () => false },
                styleManager: { hasExtension: () => false },
                notificationManager: { hasExtension: () => false },
                reactiveManager: { isInitialized: false }
            }

            const validation = validateWebComponentManagers(invalidManagers as any)
            expect(validation.isValid).toBe(false)
            expect(validation.errors.length).toBeGreaterThan(0)
        })
    })

    describe('Integration Scenarios', () => {
        it('should support complete component lifecycle', () => {
            const element = document.createElement('div')
            const componentId = 'integration-test-component'

            // Register component
            managers.domManager.registerComponent(componentId, element)

            // Configure notifications
            managers.notificationManager.configureComponent(componentId, {
                enableDebug: true
            })

            // Create shadow root
            const shadowRoot = managers.domManager.createShadowRoot(element)
            expect(shadowRoot).toBeDefined()

            // Add component styles
            managers.styleManager.addComponentStyles(
                componentId,
                ':host { display: block; }',
                shadowRoot
            )

            // Create reactive property
            managers.reactiveManager.createReactiveProperty(
                element,
                'value',
                { initialValue: 'test', attribute: true },
                componentId
            )

            // Notify lifecycle
            managers.notificationManager.notifyLifecycle(componentId, 'connected')

            // Verify everything is working
            const registration = managers.domManager.getComponentRegistration(componentId)
            const notifications = managers.notificationManager.getComponentNotifications(componentId)
            
            expect(registration).toBeDefined()
            expect(notifications.length).toBeGreaterThan(0)
            expect((element as any).value).toBe('test')

            // Cleanup
            managers.domManager.unregisterComponent(componentId)
            managers.notificationManager.cleanupComponent(componentId)
            managers.reactiveManager.cleanupComponent(componentId)
        })
    })
})
