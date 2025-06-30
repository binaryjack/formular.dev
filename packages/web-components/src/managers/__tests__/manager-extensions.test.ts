/**
 * Test suite for Web Component Manager Extensions
 * Tests that web component managers properly extend their lib counterparts
 */

import {
    createWebComponentManagers, ReactiveManager, validateWebComponentManagers,
    WebComponentDomManager, WebComponentNotificationManager, WebComponentStyleManager
} from '../index'

// Simple test framework for direct testing
function createTestSuite() {
    const tests: Array<{ name: string, fn: () => void | Promise<void> }> = []
    const results: Array<{ name: string, passed: boolean, error?: Error }> = []

    function test(name: string, fn: () => void | Promise<void>) {
        tests.push({ name, fn })
    }

    function expect(actual: any) {
        return {
            toBe: (expected: any) => {
                if (actual !== expected) {
                    throw new Error(`Expected ${actual} to be ${expected}`)
                }
            },
            toBeDefined: () => {
                if (actual === undefined) {
                    throw new Error(`Expected ${actual} to be defined`)
                }
            },
            toBeInstanceOf: (constructor: any) => {
                if (!(actual instanceof constructor)) {
                    throw new Error(`Expected ${actual} to be instance of ${constructor.name}`)
                }
            },
            toHaveLength: (length: number) => {
                if (actual.length !== length) {
                    throw new Error(`Expected ${actual} to have length ${length}, got ${actual.length}`)
                }
            },
            toHaveProperty: (prop: string) => {
                if (!(prop in actual)) {
                    throw new Error(`Expected ${actual} to have property ${prop}`)
                }
            },
            toContain: (value: any) => {
                if (!actual.includes(value)) {
                    throw new Error(`Expected ${actual} to contain ${value}`)
                }
            },
            not: {
                toThrow: () => {
                    try {
                        if (typeof actual === 'function') {
                            actual()
                        }
                    } catch (error) {
                        throw new Error(`Expected function not to throw, but it threw: ${error}`)
                    }
                }
            }
        }
    }

    async function runTests() {
        console.log('🧪 Running Manager Extension Tests...\n')

        for (const test of tests) {
            try {
                await test.fn()
                results.push({ name: test.name, passed: true })
                console.log(`✅ ${test.name}`)
            } catch (error) {
                results.push({ name: test.name, passed: false, error: error as Error })
                console.log(`❌ ${test.name}: ${(error as Error).message}`)
            }
        }

        const passed = results.filter(r => r.passed).length
        const total = results.length
        console.log(`\n📊 Results: ${passed}/${total} tests passed`)

        return { passed, total, results }
    }

    return { test, expect, runTests }
}

// WebComponentDomManager Tests
function testWebComponentDomManager(test: any, expect: any) {
    test('WebComponentDomManager should extend LibDomManager constructor', () => {
        const domManager = new WebComponentDomManager()
        expect(domManager).toBeDefined()
        expect(domManager.constructor.name).toBe('WebComponentDomManager')
    })

    test('WebComponentDomManager should inherit all lib DomManager methods', () => {
        const domManager = new WebComponentDomManager()
        
        // Core lib methods
        expect(typeof domManager.initialize).toBe('function')
        expect(typeof domManager.dmRegister).toBe('function')
        expect(typeof domManager.dmGet).toBe('function')
        expect(typeof domManager.dmExists).toBe('function')
        expect(typeof domManager.dmClear).toBe('function')
        expect(typeof domManager.dmSetValue).toBe('function')
        expect(typeof domManager.dmSetFocus).toBe('function')
        expect(typeof domManager.dmSetEnabled).toBe('function')
        expect(typeof domManager.extend).toBe('function')
        expect(typeof domManager.hasExtension).toBe('function')
    })

    test('WebComponentDomManager should have web component specific methods', () => {
        const domManager = new WebComponentDomManager()
        
        // Web component extensions
        expect(typeof domManager.createShadowRoot).toBe('function')
        expect(typeof domManager.createTemplate).toBe('function')
        expect(typeof domManager.registerComponent).toBe('function')
        expect(typeof domManager.cloneTemplate).toBe('function')
        expect(typeof domManager.startMutationObserver).toBe('function')
        expect(typeof domManager.getAllComponents).toBe('function')
        expect(typeof domManager.getElementTree).toBe('function')
    })

    test('WebComponentDomManager should have proper prototype inheritance', () => {
        const domManager = new WebComponentDomManager()
        
        // Test prototype chain using Object.getPrototypeOf (modern approach)
        const proto = Object.getPrototypeOf(domManager)
        expect(proto.constructor.name).toBe('WebComponentDomManager')
        
        const parentProto = Object.getPrototypeOf(proto)
        expect(parentProto.constructor.name).toBe('DomManager')
    })

    test('WebComponentDomManager should initialize properly', () => {
        const domManager = new WebComponentDomManager()
        expect(domManager.isInitialized).toBe(false)
        domManager.initialize()
        expect(domManager.isInitialized).toBe(true)
    })

    test('WebComponentDomManager should have web component extension properties', () => {
        const domManager = new WebComponentDomManager()
        expect(domManager._webComponentExtensions).toBeInstanceOf(Map)
        expect(domManager._componentRegistry).toBeInstanceOf(Map)
        expect(domManager._templateCache).toBeInstanceOf(Map)
        expect(domManager._mutationObserver).toBe(null)
    })
}

// WebComponentStyleManager Tests
function testWebComponentStyleManager(test: any, expect: any) {
    test('WebComponentStyleManager should extend LibStyleManager constructor', () => {
        const styleManager = new WebComponentStyleManager()
        expect(styleManager).toBeDefined()
        expect(styleManager.constructor.name).toBe('WebComponentStyleManager')
    })

    test('WebComponentStyleManager should inherit all lib StyleManager methods', () => {
        const styleManager = new WebComponentStyleManager()
        
        // Core lib methods
        expect(typeof styleManager.initialize).toBe('function')
        expect(typeof styleManager.classNames).toBe('function')
        expect(typeof styleManager.update).toBe('function')
        expect(typeof styleManager.get).toBe('function')
        expect(typeof styleManager.getFlagsList).toBe('function')
        expect(typeof styleManager.getFlagsObject).toBe('function')
        expect(typeof styleManager.extend).toBe('function')
        expect(typeof styleManager.hasExtension).toBe('function')
    })

    test('WebComponentStyleManager should have web component specific methods', () => {
        const styleManager = new WebComponentStyleManager()
        
        // Web component extensions
        expect(typeof styleManager.addComponentStyles).toBe('function')
        expect(typeof styleManager.removeComponentStyles).toBe('function')
        expect(typeof styleManager.setCSSVariable).toBe('function')
        expect(typeof styleManager.getCSSVariable).toBe('function')
        expect(typeof styleManager.applyTheme).toBe('function')
        expect(typeof styleManager.generateCSS).toBe('function')
        expect(typeof styleManager.registerTheme).toBe('function')
        expect(typeof styleManager.getAvailableThemes).toBe('function')
    })

    test('WebComponentStyleManager should have proper prototype inheritance', () => {
        const styleManager = new WebComponentStyleManager()
        
        const proto = Object.getPrototypeOf(styleManager)
        expect(proto.constructor.name).toBe('WebComponentStyleManager')
        
        const parentProto = Object.getPrototypeOf(proto)
        expect(parentProto.constructor.name).toBe('StyleManager')
    })

    test('WebComponentStyleManager should initialize properly', () => {
        const styleManager = new WebComponentStyleManager()
        expect(styleManager.isInitialized).toBe(false)
        styleManager.initialize()
        expect(styleManager.isInitialized).toBe(true)
    })
}

// WebComponentNotificationManager Tests  
function testWebComponentNotificationManager(test: any, expect: any) {
    test('WebComponentNotificationManager should extend LibNotificationManager constructor', () => {
        const notificationManager = new WebComponentNotificationManager()
        expect(notificationManager).toBeDefined()
        expect(notificationManager.constructor.name).toBe('WebComponentNotificationManager')
    })

    test('WebComponentNotificationManager should inherit all lib NotificationManager methods', () => {
        const notificationManager = new WebComponentNotificationManager()
        
        // Core lib methods
        expect(typeof notificationManager.initialize).toBe('function')
        expect(typeof notificationManager.notify).toBe('function')
        expect(typeof notificationManager.accept).toBe('function')
        expect(typeof notificationManager.dismiss).toBe('function')
        expect(typeof notificationManager.trigger).toBe('function')
        expect(typeof notificationManager.batchNotify).toBe('function')
        expect(typeof notificationManager.dispose).toBe('function')
        expect(typeof notificationManager.extend).toBe('function')
        expect(typeof notificationManager.hasExtension).toBe('function')
    })

    test('WebComponentNotificationManager should have web component specific methods', () => {
        const notificationManager = new WebComponentNotificationManager()
        
        // Web component extensions
        expect(typeof notificationManager.showComponentDebug).toBe('function')
        expect(typeof notificationManager.notifyLifecycle).toBe('function')
        expect(typeof notificationManager.setGlobalDebugMode).toBe('function')
        expect(typeof notificationManager.batchNotify).toBe('function')
        expect(typeof notificationManager.queueNotification).toBe('function')
        expect(typeof notificationManager.getComponentNotifications).toBe('function')
    })

    test('WebComponentNotificationManager should have proper prototype inheritance', () => {
        const notificationManager = new WebComponentNotificationManager()
        
        const proto = Object.getPrototypeOf(notificationManager)
        expect(proto.constructor.name).toBe('WebComponentNotificationManager')
        
        const parentProto = Object.getPrototypeOf(proto)
        expect(parentProto.constructor.name).toBe('NotificationManager')
    })

    test('WebComponentNotificationManager should initialize properly', () => {
        const notificationManager = new WebComponentNotificationManager()
        expect(notificationManager.isInitialized).toBe(false)
        notificationManager.initialize()
        expect(notificationManager.isInitialized).toBe(true)
    })
}

// ReactiveManager Tests
function testReactiveManager(test: any, expect: any) {
    test('ReactiveManager should be a proper constructor', () => {
        const reactiveManager = new ReactiveManager()
        expect(reactiveManager).toBeDefined()
        expect(reactiveManager.constructor.name).toBe('ReactiveManager')
    })

    test('ReactiveManager should have reactive management methods', () => {
        const reactiveManager = new ReactiveManager()
        expect(typeof reactiveManager.initialize).toBe('function')
        expect(typeof reactiveManager.createReactiveProperty).toBe('function')
        expect(typeof reactiveManager.createComputedProperty).toBe('function')
        expect(typeof reactiveManager.scheduleUpdate).toBe('function')
        expect(typeof reactiveManager.flushUpdates).toBe('function')
    })

    test('ReactiveManager should initialize properly', () => {
        const reactiveManager = new ReactiveManager()
        expect(reactiveManager.isInitialized).toBe(false)
        reactiveManager.initialize()
        expect(reactiveManager.isInitialized).toBe(true)
    })
}

// Manager Factory Tests
function testManagerFactory(test: any, expect: any) {
    test('Manager Factory should create all required managers', () => {
        const managers = createWebComponentManagers({
            enableDebugMode: true,
            batchUpdateDelay: 16
        })

        expect(managers).toBeDefined()
        expect(managers.domManager).toBeDefined()
        expect(managers.styleManager).toBeDefined()
        expect(managers.notificationManager).toBeDefined()
        expect(managers.reactiveManager).toBeDefined()
    })

    test('Manager Factory should create managers with proper types', () => {
        const managers = createWebComponentManagers()
        
        expect(managers.domManager.constructor.name).toBe('WebComponentDomManager')
        expect(managers.styleManager.constructor.name).toBe('WebComponentStyleManager')
        expect(managers.notificationManager.constructor.name).toBe('WebComponentNotificationManager')
        expect(managers.reactiveManager.constructor.name).toBe('ReactiveManager')
    })

    test('Manager Factory should initialize all managers', () => {
        const managers = createWebComponentManagers()
        
        expect(managers.domManager.isInitialized).toBe(true)
        expect(managers.styleManager.isInitialized).toBe(true)
        expect(managers.notificationManager.isInitialized).toBe(true)
        expect(managers.reactiveManager.isInitialized).toBe(true)
    })

    test('Manager Factory should pass validation', () => {
        const managers = createWebComponentManagers()
        const validation = validateWebComponentManagers(managers)
        
        expect(validation.isValid).toBe(true)
        expect(validation.errors).toHaveLength(0)
    })
}

// Integration Tests
function testIntegration(test: any, expect: any) {
    test('Integration: should maintain lib functionality after extension', () => {
        const managers = createWebComponentManagers({ enableDebugMode: true })
        
        // Test that original lib methods still work
        const testElement = document.createElement('div')
        testElement.id = 'test-element'
        document.body.appendChild(testElement)

        managers.domManager.dmRegister(testElement)
        expect(managers.domManager.dmExists('test-element')).toBe(true)
        expect(managers.domManager.dmGet('test-element')).toBe(testElement)

        document.body.removeChild(testElement)
    })

    test('Integration: should provide web component functionality', () => {
        const managers = createWebComponentManagers()
        const testElement = document.createElement('div')
        
        // Test web component specific functionality
        const shadowRoot = managers.domManager.createShadowRoot(testElement, { mode: 'open' })
        expect(shadowRoot).toBeInstanceOf(ShadowRoot)
        expect(shadowRoot.mode).toBe('open')

        const template = managers.domManager.createTemplate('<p>Test content</p>', 'p { color: red; }')
        expect(template).toBeInstanceOf(HTMLTemplateElement)
        expect(template.innerHTML).toContain('<style>')
        expect(template.innerHTML).toContain('<p>Test content</p>')
    })

    test('Integration: should handle component lifecycle notifications', () => {
        const managers = createWebComponentManagers()
        const mockComponent = { 
            tagName: 'test-component',
            id: 'test-1'
        }

        expect(() => {
            managers.notificationManager.notifyLifecycle('connected', mockComponent)
            managers.notificationManager.notifyLifecycle('disconnected', mockComponent)
        }).not.toThrow()
    })

    test('Integration: should manage reactive properties', () => {
        const managers = createWebComponentManagers()
        const testObj = {}
        
        managers.reactiveManager.createReactiveProperty(testObj, 'testProp', {
            initialValue: 'initial',
            type: 'string'
        })

        expect(testObj).toHaveProperty('testProp')
        expect((testObj as any).testProp).toBe('initial')
    })
}

// Export test runner
export async function runManagerExtensionTests() {
    const { test, expect, runTests } = createTestSuite()
    
    // Register all test suites
    testWebComponentDomManager(test, expect)
    testWebComponentStyleManager(test, expect)
    testWebComponentNotificationManager(test, expect)
    testReactiveManager(test, expect)
    testManagerFactory(test, expect)
    testIntegration(test, expect)
    
    // Run tests
    return await runTests()
}
