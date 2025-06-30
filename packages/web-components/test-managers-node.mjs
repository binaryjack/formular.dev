import { writeFileSync } from 'fs';

async function testManagersWithFile() {
    const results = [];
    
    try {
        // Dynamic import from built distribution
        const module = await import('./dist/index.esm.js');
        const { 
            createWebComponentManagers, 
            WebComponentDomManager,
            WebComponentStyleManager,
            WebComponentNotificationManager
        } = module;
        
        results.push('✅ Successfully imported managers');
        
        // Test individual constructors
        const domManager = new WebComponentDomManager();
        results.push('✅ WebComponentDomManager constructor works');
        
        const styleManager = new WebComponentStyleManager();
        results.push('✅ WebComponentStyleManager constructor works');
        
        const notificationManager = new WebComponentNotificationManager();
        results.push('✅ WebComponentNotificationManager constructor works');
        
        // Test factory
        const managers = createWebComponentManagers();
        results.push('✅ createWebComponentManagers factory works');
        
        // Test DOM manager methods
        const domMethods = ['createShadowRoot', 'createTemplate', 'registerComponent', 'cloneTemplate', 'getAllComponents'];
        for (const method of domMethods) {
            if (typeof domManager[method] === 'function') {
                results.push(`✅ DomManager has ${method} method`);
            } else {
                results.push(`❌ DomManager missing ${method} method`);
            }
        }
        
        // Test Style manager methods
        const styleMethods = ['addComponentStyles', 'setCSSVariable', 'getCSSVariable', 'applyTheme'];
        for (const method of styleMethods) {
            if (typeof styleManager[method] === 'function') {
                results.push(`✅ StyleManager has ${method} method`);
            } else {
                results.push(`❌ StyleManager missing ${method} method`);
            }
        }
        
        // Test Notification manager methods
        const notificationMethods = ['showComponentDebug', 'notifyLifecycle', 'setGlobalDebugMode'];
        for (const method of notificationMethods) {
            if (typeof notificationManager[method] === 'function') {
                results.push(`✅ NotificationManager has ${method} method`);
            } else {
                results.push(`❌ NotificationManager missing ${method} method`);
            }
        }
        
        // Test inheritance
        const domProto = Object.getPrototypeOf(domManager);
        if (domProto.constructor.name === 'WebComponentDomManager') {
            results.push('✅ DomManager has correct constructor name');
            
            const parentProto = Object.getPrototypeOf(domProto);
            if (parentProto.constructor.name === 'DomManager') {
                results.push('✅ DomManager has correct prototype inheritance');
            } else {
                results.push(`❌ DomManager prototype inheritance broken: ${parentProto.constructor.name}`);
            }
        } else {
            results.push(`❌ DomManager constructor name wrong: ${domProto.constructor.name}`);
        }
        
        results.push('🎉 All tests completed!');
        
    } catch (error) {
        results.push(`❌ Error: ${error.message}`);
        results.push(`Stack: ${error.stack}`);
    }
    
    const output = results.join('\n');
    console.log(output);
    
    // Write to file
    writeFileSync('test-results.txt', output, 'utf8');
    console.log('Results written to test-results.txt');
}

// Use .mjs extension or add "type": "module" to run this
export { testManagersWithFile };

// If running directly
if (import.meta.url === `file://${process.argv[1]}`) {
    testManagersWithFile();
}
