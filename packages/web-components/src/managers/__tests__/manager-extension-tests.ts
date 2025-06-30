/**
 * Simple Manual Tests for Manager Extensions
 * Run this to verify managers properly extend their lib counterparts
 */

import {
    createWebComponentManagers, ReactiveManager, validateWebComponentManagers,
    WebComponentDomManager, WebComponentNotificationManager, WebComponentStyleManager
} from '../index';

/**
 * Simple test runner
 */
function runTest(name: string, testFn: () => void | boolean): boolean {
    try {
        const result = testFn()
        if (result !== false) {
            console.log(`✅ ${name}`)
            return true
        } else {
            console.log(`❌ ${name}: Test returned false`)
            return false
        }
    } catch (error) {
        console.log(`❌ ${name}: ${(error as Error).message}`)
        return false
    }
}

/**
 * Main test function - run this to execute all tests
 */
export function runManagerExtensionTests(): { passed: number, total: number } {
    console.log('🧪 Testing Manager Extension System...\n')
    
    let passed = 0
    let total = 0

    // Test 1: WebComponentDomManager Construction
    total++
    if (runTest('WebComponentDomManager should be constructible', () => {
        const manager = new WebComponentDomManager()
        return manager !== undefined && manager.constructor.name === 'WebComponentDomManager'
    })) passed++

    // Test 2: WebComponentDomManager Inheritance
    total++
    if (runTest('WebComponentDomManager should inherit lib methods', () => {
        const manager = new WebComponentDomManager()
        return typeof manager.initialize === 'function' && 
               typeof manager.dmRegister === 'function' &&
               typeof manager.extend === 'function' &&
               typeof manager.hasExtension === 'function'
    })) passed++

    // Test 3: WebComponentDomManager Extensions
    total++
    if (runTest('WebComponentDomManager should have web component methods', () => {
        const manager = new WebComponentDomManager()
        return typeof manager.createShadowRoot === 'function' &&
               typeof manager.createTemplate === 'function' &&
               typeof manager.registerComponent === 'function'
    })) passed++

    // Test 4: WebComponentStyleManager Construction
    total++
    if (runTest('WebComponentStyleManager should be constructible', () => {
        const manager = new WebComponentStyleManager()
        return manager !== undefined && manager.constructor.name === 'WebComponentStyleManager'
    })) passed++

    // Test 5: WebComponentStyleManager Inheritance
    total++
    if (runTest('WebComponentStyleManager should inherit lib methods', () => {
        const manager = new WebComponentStyleManager()
        return typeof manager.initialize === 'function' &&
               typeof manager.classNames === 'function' &&
               typeof manager.update === 'function'
    })) passed++

    // Test 6: WebComponentStyleManager Extensions
    total++
    if (runTest('WebComponentStyleManager should have web component methods', () => {
        const manager = new WebComponentStyleManager()
        return typeof manager.addComponentStyles === 'function' &&
               typeof manager.setCSSVariable === 'function' &&
               typeof manager.applyTheme === 'function'
    })) passed++

    // Test 7: WebComponentNotificationManager Construction
    total++
    if (runTest('WebComponentNotificationManager should be constructible', () => {
        const manager = new WebComponentNotificationManager()
        return manager !== undefined && manager.constructor.name === 'WebComponentNotificationManager'
    })) passed++

    // Test 8: WebComponentNotificationManager Inheritance
    total++
    if (runTest('WebComponentNotificationManager should inherit lib methods', () => {
        const manager = new WebComponentNotificationManager()
        return typeof manager.initialize === 'function' &&
               typeof manager.notify === 'function' &&
               typeof manager.accept === 'function'
    })) passed++

    // Test 9: WebComponentNotificationManager Extensions
    total++
    if (runTest('WebComponentNotificationManager should have web component methods', () => {
        const manager = new WebComponentNotificationManager()
        return typeof manager.showComponentDebug === 'function' &&
               typeof manager.notifyLifecycle === 'function' &&
               typeof manager.setGlobalDebugMode === 'function'
    })) passed++

    // Test 10: ReactiveManager Construction
    total++
    if (runTest('ReactiveManager should be constructible', () => {
        const manager = new ReactiveManager()
        return manager !== undefined && manager.constructor.name === 'ReactiveManager'
    })) passed++

    // Test 11: ReactiveManager Methods
    total++
    if (runTest('ReactiveManager should have reactive methods', () => {
        const manager = new ReactiveManager()
        return typeof manager.initialize === 'function' &&
               typeof manager.createReactiveProperty === 'function' &&
               typeof manager.scheduleUpdate === 'function'
    })) passed++

    // Test 12: Manager Factory
    total++
    if (runTest('createWebComponentManagers should create all managers', () => {
        const managers = createWebComponentManagers()
        return managers.domManager !== undefined &&
               managers.styleManager !== undefined &&
               managers.notificationManager !== undefined &&
               managers.reactiveManager !== undefined
    })) passed++

    // Test 13: Manager Factory Types
    total++
    if (runTest('createWebComponentManagers should create correct types', () => {
        const managers = createWebComponentManagers()
        return managers.domManager.constructor.name === 'WebComponentDomManager' &&
               managers.styleManager.constructor.name === 'WebComponentStyleManager' &&
               managers.notificationManager.constructor.name === 'WebComponentNotificationManager' &&
               managers.reactiveManager.constructor.name === 'ReactiveManager'
    })) passed++

    // Test 14: Manager Initialization
    total++
    if (runTest('createWebComponentManagers should initialize managers', () => {
        const managers = createWebComponentManagers()
        return managers.domManager.isInitialized === true &&
               managers.styleManager.isInitialized === true &&
               managers.notificationManager.isInitialized === true &&
               managers.reactiveManager.isInitialized === true
    })) passed++

    // Test 15: Manager Validation
    total++
    if (runTest('validateWebComponentManagers should pass for valid managers', () => {
        const managers = createWebComponentManagers()
        const validation = validateWebComponentManagers(managers)
        return validation.isValid === true && validation.errors.length === 0
    })) passed++

    // Test 16: Prototype Chain
    total++
    if (runTest('Managers should have proper prototype inheritance', () => {
        const domManager = new WebComponentDomManager()
        const proto = Object.getPrototypeOf(domManager)
        const parentProto = Object.getPrototypeOf(proto)
        return proto.constructor.name === 'WebComponentDomManager' &&
               parentProto.constructor.name === 'DomManager'
    })) passed++

    // Test 17: Manager Properties
    total++
    if (runTest('Managers should have extension properties', () => {
        const domManager = new WebComponentDomManager()
        return domManager._webComponentExtensions instanceof Map &&
               domManager._componentRegistry instanceof Map &&
               domManager._templateCache instanceof Map
    })) passed++

    // Test 18: Integration Test - DOM Methods
    total++
    if (runTest('DOM manager should work with real DOM elements', () => {
        const managers = createWebComponentManagers()
        const testElement = document.createElement('div')
        testElement.id = 'test-element'
        document.body.appendChild(testElement)

        managers.domManager.dmRegister(testElement)
        const exists = managers.domManager.dmExists('test-element')
        const retrieved = managers.domManager.dmGet('test-element')
        
        document.body.removeChild(testElement)
        
        return exists === true && retrieved === testElement
    })) passed++

    // Test 19: Integration Test - Shadow DOM
    total++
    if (runTest('DOM manager should create shadow roots', () => {
        const managers = createWebComponentManagers()
        const testElement = document.createElement('div')
        
        const shadowRoot = managers.domManager.createShadowRoot(testElement, { mode: 'open' })
        
        return shadowRoot instanceof ShadowRoot && shadowRoot.mode === 'open'
    })) passed++

    // Test 20: Integration Test - Templates
    total++
    if (runTest('DOM manager should create templates', () => {
        const managers = createWebComponentManagers()
        
        const template = managers.domManager.createTemplate('<p>Test</p>', 'p { color: red; }')
        
        return template instanceof HTMLTemplateElement &&
               template.innerHTML.includes('<style>') &&
               template.innerHTML.includes('<p>Test</p>')
    })) passed++

    console.log(`\n📊 Final Results: ${passed}/${total} tests passed`)
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`)

    if (passed === total) {
        console.log('🎉 All tests passed! Manager extension system is working correctly.')
    } else {
        console.log('⚠️ Some tests failed. Please check the implementation.')
    }

    return { passed, total }
}

// Export for use in other files
export {
    createWebComponentManagers, ReactiveManager, validateWebComponentManagers, WebComponentDomManager, WebComponentNotificationManager, WebComponentStyleManager
};

