/**
 * Test component to verify the merged AppContext functionality
 */

import { useService } from '@adapters/react/services/use-service'
import useAppContext from '@components/context/app-context/app-context.context'
import {
    IConfigurationManager,
    IFormularManager,
    SConfigurationManager,
    SFormularManager
} from 'formular.dev.lib'
import { useEffect } from 'react'

const MergedContextTest = () => {
    const appContext = useAppContext()
    const { getService, getServiceSync, serviceManager } = useService()

    useEffect(() => {
        console.log('=== MERGED CONTEXT TEST ===')

        // Test 1: AppContext properties
        console.log('✅ App Context Properties:')
        console.log('  - media:', appContext.media)
        console.log('  - breakpoints:', appContext.breakpoints)
        console.log('  - holdScroll:', appContext.holdScroll)

        // Test 2: Service Manager access
        console.log('✅ Service Manager Access:')
        console.log('  - serviceManager:', serviceManager)
        console.log('  - serviceManager constructor:', serviceManager.constructor.name)

        // Test 3: Service resolution via useService hook
        console.log('✅ Service Resolution via useService:')
        try {
            const configManager = getService<IConfigurationManager>(SConfigurationManager)
            console.log('  - ConfigurationManager via getService:', configManager)

            const formularManager = getServiceSync<IFormularManager>(SFormularManager)
            console.log('  - FormularManager via getServiceSync:', formularManager)
        } catch (error) {
            console.error('  - Error resolving services:', error)
        }

        // Test 4: Configuration access via merged context
        console.log('✅ Configuration Access via AppContext:')
        try {
            const validationTriggers = appContext.getConfiguration(
                'behavior',
                'form',
                'validationTriggers'
            )
            console.log('  - Validation triggers:', validationTriggers)

            const formBehavior = appContext.getConfiguration('behavior', 'form')
            console.log('  - Form behavior:', formBehavior)
        } catch (error) {
            console.error('  - Error accessing configuration:', error)
        }

        // Test 5: Service registration check
        console.log('✅ Service Registration Check:')
        console.log(
            '  - ConfigurationManager registered:',
            serviceManager.isRegistered(SConfigurationManager)
        )
        console.log(
            '  - FormularManager registered:',
            serviceManager.isRegistered(SFormularManager)
        )

        console.log('=== MERGE TEST COMPLETE ===')
    }, [appContext, getService, getServiceSync, serviceManager])

    return (
        <div className="p-4 bg-green-100 border border-green-300 rounded-lg m-4">
            <h2 className="text-lg font-bold text-green-800 mb-2">
                🧪 Merged Context Test Component
            </h2>
            <div className="text-sm text-green-700">
                <p>✅ Single provider for both app context and service manager</p>
                <p>✅ Configuration access via getConfiguration method</p>
                <p>✅ Service access via useService hook</p>
                <p>✅ Direct service manager access</p>
                <p className="mt-2 font-medium">Check console for detailed test results</p>
            </div>
        </div>
    )
}

export default MergedContextTest
