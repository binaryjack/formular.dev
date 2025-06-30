/**
 * Jest Test Suite for Manager Extensions
 * For use with Jest test runner
 */

import {
    createWebComponentManagers, ReactiveManager, validateWebComponentManagers,
    WebComponentDomManager, WebComponentNotificationManager, WebComponentStyleManager
} from '../index'

describe('Manager Extension System', () => {
    describe('WebComponentDomManager', () => {
        let domManager: any

        beforeEach(() => {
            domManager = new WebComponentDomManager()
        })

        it('should extend LibDomManager constructor', () => {
            expect(domManager).toBeDefined()
            expect(domManager.constructor.name).toBe('WebComponentDomManager')
        })

        it('should inherit all lib DomManager methods', () => {
            expect(typeof domManager.initialize).toBe('function')
            expect(typeof domManager.dmRegister).toBe('function')
            expect(typeof domManager.dmGet).toBe('function')
            expect(typeof domManager.dmExists).toBe('function')
            expect(typeof domManager.extend).toBe('function')
            expect(typeof domManager.hasExtension).toBe('function')
        })

        it('should have web component specific methods', () => {
            expect(typeof domManager.createShadowRoot).toBe('function')
            expect(typeof domManager.createTemplate).toBe('function')
            expect(typeof domManager.registerComponent).toBe('function')
        })

        it('should have proper prototype inheritance', () => {
            const proto = Object.getPrototypeOf(domManager)
            expect(proto.constructor.name).toBe('WebComponentDomManager')
            
            const parentProto = Object.getPrototypeOf(proto)
            expect(parentProto.constructor.name).toBe('DomManager')
        })

        it('should initialize properly', () => {
            expect(domManager.isInitialized).toBe(false)
            domManager.initialize()
            expect(domManager.isInitialized).toBe(true)
        })

        it('should have web component extension properties', () => {
            expect(domManager._webComponentExtensions).toBeInstanceOf(Map)
            expect(domManager._componentRegistry).toBeInstanceOf(Map)
            expect(domManager._templateCache).toBeInstanceOf(Map)
        })
    })

    describe('WebComponentStyleManager', () => {
        let styleManager: any

        beforeEach(() => {
            styleManager = new WebComponentStyleManager()
        })

        it('should extend LibStyleManager constructor', () => {
            expect(styleManager).toBeDefined()
            expect(styleManager.constructor.name).toBe('WebComponentStyleManager')
        })

        it('should inherit all lib StyleManager methods', () => {
            expect(typeof styleManager.initialize).toBe('function')
            expect(typeof styleManager.classNames).toBe('function')
            expect(typeof styleManager.update).toBe('function')
        })

        it('should have web component specific methods', () => {
            expect(typeof styleManager.addComponentStyles).toBe('function')
            expect(typeof styleManager.setCSSVariable).toBe('function')
            expect(typeof styleManager.applyTheme).toBe('function')
        })

        it('should have proper prototype inheritance', () => {
            const proto = Object.getPrototypeOf(styleManager)
            expect(proto.constructor.name).toBe('WebComponentStyleManager')
            
            const parentProto = Object.getPrototypeOf(proto)
            expect(parentProto.constructor.name).toBe('StyleManager')
        })

        it('should initialize properly', () => {
            expect(styleManager.isInitialized).toBe(false)
            styleManager.initialize()
            expect(styleManager.isInitialized).toBe(true)
        })
    })

    describe('WebComponentNotificationManager', () => {
        let notificationManager: any

        beforeEach(() => {
            notificationManager = new WebComponentNotificationManager()
        })

        it('should extend LibNotificationManager constructor', () => {
            expect(notificationManager).toBeDefined()
            expect(notificationManager.constructor.name).toBe('WebComponentNotificationManager')
        })

        it('should inherit all lib NotificationManager methods', () => {
            expect(typeof notificationManager.initialize).toBe('function')
            expect(typeof notificationManager.notify).toBe('function')
            expect(typeof notificationManager.accept).toBe('function')
        })

        it('should have web component specific methods', () => {
            expect(typeof notificationManager.showComponentDebug).toBe('function')
            expect(typeof notificationManager.notifyLifecycle).toBe('function')
            expect(typeof notificationManager.setGlobalDebugMode).toBe('function')
        })

        it('should have proper prototype inheritance', () => {
            const proto = Object.getPrototypeOf(notificationManager)
            expect(proto.constructor.name).toBe('WebComponentNotificationManager')
            
            const parentProto = Object.getPrototypeOf(proto)
            expect(parentProto.constructor.name).toBe('NotificationManager')
        })

        it('should initialize properly', () => {
            expect(notificationManager.isInitialized).toBe(false)
            notificationManager.initialize()
            expect(notificationManager.isInitialized).toBe(true)
        })
    })

    describe('ReactiveManager', () => {
        let reactiveManager: any

        beforeEach(() => {
            reactiveManager = new ReactiveManager()
        })

        it('should be a proper constructor', () => {
            expect(reactiveManager).toBeDefined()
            expect(reactiveManager.constructor.name).toBe('ReactiveManager')
        })

        it('should have reactive management methods', () => {
            expect(typeof reactiveManager.initialize).toBe('function')
            expect(typeof reactiveManager.createReactiveProperty).toBe('function')
            expect(typeof reactiveManager.scheduleUpdate).toBe('function')
        })

        it('should initialize properly', () => {
            expect(reactiveManager.isInitialized).toBe(false)
            reactiveManager.initialize()
            expect(reactiveManager.isInitialized).toBe(true)
        })
    })

    describe('Manager Factory', () => {
        let managers: any

        beforeEach(() => {
            managers = createWebComponentManagers({
                enableDebugMode: true,
                batchUpdateDelay: 16
            })
        })

        it('should create all required managers', () => {
            expect(managers).toBeDefined()
            expect(managers.domManager).toBeDefined()
            expect(managers.styleManager).toBeDefined()
            expect(managers.notificationManager).toBeDefined()
            expect(managers.reactiveManager).toBeDefined()
        })

        it('should create managers with proper types', () => {
            expect(managers.domManager.constructor.name).toBe('WebComponentDomManager')
            expect(managers.styleManager.constructor.name).toBe('WebComponentStyleManager')
            expect(managers.notificationManager.constructor.name).toBe('WebComponentNotificationManager')
            expect(managers.reactiveManager.constructor.name).toBe('ReactiveManager')
        })

        it('should initialize all managers', () => {
            expect(managers.domManager.isInitialized).toBe(true)
            expect(managers.styleManager.isInitialized).toBe(true)
            expect(managers.notificationManager.isInitialized).toBe(true)
            expect(managers.reactiveManager.isInitialized).toBe(true)
        })

        it('should pass validation', () => {
            const validation = validateWebComponentManagers(managers)
            expect(validation.isValid).toBe(true)
            expect(validation.errors).toHaveLength(0)
        })

        it('should configure managers based on config', () => {
            const configuredManagers = createWebComponentManagers({
                batchUpdateDelay: 32
            })
            expect(configuredManagers.reactiveManager.batchConfig.debounceTime).toBe(32)
        })
    })

    describe('Integration Tests', () => {
        let managers: any

        beforeEach(() => {
            managers = createWebComponentManagers({ enableDebugMode: true })
        })

        it('should maintain lib functionality after extension', () => {
            const testElement = document.createElement('div')
            testElement.id = 'test-element'
            document.body.appendChild(testElement)

            managers.domManager.dmRegister(testElement)
            expect(managers.domManager.dmExists('test-element')).toBe(true)
            expect(managers.domManager.dmGet('test-element')).toBe(testElement)

            document.body.removeChild(testElement)
        })

        it('should provide web component functionality', () => {
            const testElement = document.createElement('div')
            
            const shadowRoot = managers.domManager.createShadowRoot(testElement, { mode: 'open' })
            expect(shadowRoot).toBeInstanceOf(ShadowRoot)
            expect(shadowRoot.mode).toBe('open')

            const template = managers.domManager.createTemplate('<p>Test</p>', 'p { color: red; }')
            expect(template).toBeInstanceOf(HTMLTemplateElement)
            expect(template.innerHTML).toContain('<style>')
            expect(template.innerHTML).toContain('<p>Test</p>')
        })

        it('should handle component lifecycle notifications', () => {
            const mockComponent = { 
                tagName: 'test-component',
                id: 'test-1'
            }

            expect(() => {
                managers.notificationManager.notifyLifecycle('connected', mockComponent)
                managers.notificationManager.notifyLifecycle('disconnected', mockComponent)
            }).not.toThrow()
        })

        it('should manage reactive properties', () => {
            const testObj = {}
            
            managers.reactiveManager.createReactiveProperty(testObj, 'testProp', {
                initialValue: 'initial',
                type: 'string'
            })

            expect(testObj).toHaveProperty('testProp')
            expect((testObj as any).testProp).toBe('initial')
        })
    })
})
