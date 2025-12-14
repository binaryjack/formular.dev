import { useService } from '@adapters/react/services/use-service'
import {
    IConfigurationManager,
    IFormularManager,
    SConfigurationManager,
    SFormularManager
} from 'formular.dev.lib'
import { useEffect } from 'react'

const ServiceManagerDebug = () => {
    const { getService, serviceManager } = useService()

    useEffect(() => {
        console.log('=== SERVICE MANAGER DEBUG ===')
        console.log('Service Manager instance:', serviceManager)
        console.log('Service Manager constructor:', serviceManager.constructor.name)

        // Check if services are registered
        const isFormularManagerRegistered = serviceManager.isRegistered(SFormularManager)
        const isConfigManagerRegistered = serviceManager.isRegistered(SConfigurationManager)

        console.log('FormularManager registered:', isFormularManagerRegistered)
        console.log('ConfigurationManager registered:', isConfigManagerRegistered)

        if (isConfigManagerRegistered) {
            try {
                const configManager = getService<IConfigurationManager>(SConfigurationManager)
                console.log('Configuration Manager instance:', configManager)
                console.log('Configuration Manager constructor:', configManager?.constructor?.name)
                console.log('Active configuration:', configManager?.activeConfiguration)

                if (configManager?.activeConfiguration) {
                    console.log('Configuration name:', configManager.activeConfiguration.name)
                    console.log(
                        'Configuration environment:',
                        configManager.activeConfiguration.targetEnvironment
                    )

                    // Test getConfigByName method - using correct path structure
                    const formBehavior = configManager.getConfigByName('behavior', 'form')
                    console.log('Form behavior config:', formBehavior)

                    const validationTriggers = configManager.getConfigByName(
                        'behavior',
                        'form',
                        'validationTriggers'
                    )
                    console.log('Validation triggers:', validationTriggers)

                    // Test additional configuration paths
                    const defaultCulture = configManager.getConfigByName(
                        'cultures',
                        'defaultCulture'
                    )
                    console.log('Default culture:', defaultCulture)

                    const renderingSuffixes = configManager.getConfigByName('rendering', 'suffixes')
                    console.log('Rendering suffixes:', renderingSuffixes)
                }
            } catch (error) {
                console.error('Error accessing configuration manager:', error)
            }
        }

        if (isFormularManagerRegistered) {
            try {
                const formularManager = getService<IFormularManager>(SFormularManager)
                console.log('Formular Manager instance:', formularManager)
                console.log('Formular Manager constructor:', formularManager?.constructor?.name)
            } catch (error) {
                console.error('Error accessing formular manager:', error)
            }
        }

        // Print all registered services
        console.log('All registered services:', Object.keys(serviceManager.services || {}))
    }, [getService, serviceManager])

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h2>Service Manager Debug</h2>
            <p>Check the browser console for debug information.</p>
            <div>
                <strong>Service Manager:</strong> {serviceManager ? 'Available' : 'Not Available'}
            </div>
            <div>
                <strong>FormularManager Registered:</strong>{' '}
                {serviceManager?.isRegistered(SFormularManager) ? 'Yes' : 'No'}
            </div>
            <div>
                <strong>ConfigurationManager Registered:</strong>{' '}
                {serviceManager?.isRegistered(SConfigurationManager) ? 'Yes' : 'No'}
            </div>
        </div>
    )
}

export default ServiceManagerDebug
