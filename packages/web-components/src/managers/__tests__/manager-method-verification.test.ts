/**
 * Simple verification test for manager extensions
 * Tests the actual methods that should be available after fixes
 */

import {
    createWebComponentManagers, WebComponentDomManager, WebComponentNotificationManager,
    WebComponentStyleManager
} from '../index';

describe('Manager Extension Verification', () => {
    
    describe('WebComponentDomManager', () => {
        test('should have corrected method names', () => {
            const domManager = new WebComponentDomManager()
            
            // These are the corrected method names that should exist
            expect(typeof domManager.createShadowRoot).toBe('function')
            expect(typeof domManager.createTemplate).toBe('function')
            expect(typeof domManager.registerComponent).toBe('function')
            expect(typeof domManager.cloneTemplate).toBe('function')
            expect(typeof domManager.getAllComponents).toBe('function') // was getRegisteredComponents
            expect(typeof domManager.getElementTree).toBe('function') // was debugComponentTree
            
            // Should NOT have the old incorrect method names
            expect(typeof domManager.observeComponentChanges).toBe('undefined')
            expect(typeof domManager.getRegisteredComponents).toBe('undefined')
            expect(typeof domManager.debugComponentTree).toBe('undefined')
        })
    })

    describe('WebComponentStyleManager', () => {
        test('should have corrected method names', () => {
            const styleManager = new WebComponentStyleManager()
            
            // These are the corrected method names that should exist
            expect(typeof styleManager.addComponentStyles).toBe('function')
            expect(typeof styleManager.removeComponentStyles).toBe('function')
            expect(typeof styleManager.setCSSVariable).toBe('function')
            expect(typeof styleManager.getCSSVariable).toBe('function')
            expect(typeof styleManager.applyTheme).toBe('function')
            expect(typeof styleManager.generateCSS).toBe('function')
            expect(typeof styleManager.registerTheme).toBe('function')
            
            // Should NOT have the old incorrect method names
            expect(typeof styleManager.createStyleSheet).toBe('undefined')
            expect(typeof styleManager.injectGlobalStyles).toBe('undefined')
            expect(typeof styleManager.optimizeStyles).toBe('undefined')
        })
    })

    describe('WebComponentNotificationManager', () => {
        test('should have corrected method names', () => {
            const notificationManager = new WebComponentNotificationManager()
            
            // These are the corrected method names that should exist
            expect(typeof notificationManager.showComponentDebug).toBe('function')
            expect(typeof notificationManager.notifyLifecycle).toBe('function')
            expect(typeof notificationManager.setGlobalDebugMode).toBe('function')
            expect(typeof notificationManager.batchNotify).toBe('function')
            expect(typeof notificationManager.queueNotification).toBe('function')
            
            // Should NOT have the old incorrect method names
            expect(typeof notificationManager.logComponentEvent).toBe('undefined')
            expect(typeof notificationManager.trackComponentPerformance).toBe('undefined')
            expect(typeof notificationManager.createComponentNotifier).toBe('undefined')
        })
    })
    
    describe('Manager Factory', () => {
        test('should create managers with correct types', () => {
            const managers = createWebComponentManagers()
            
            expect(managers.domManager.constructor.name).toBe('WebComponentDomManager')
            expect(managers.styleManager.constructor.name).toBe('WebComponentStyleManager')
            expect(managers.notificationManager.constructor.name).toBe('WebComponentNotificationManager')
            expect(managers.reactiveManager.constructor.name).toBe('ReactiveManager')
        })
    })
})
