/**
 * FORMULAR - Usage Examples for New DI System
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Examples demonstrating how to use the new factory-based DI system
 */

import {
    IServiceManager,
    IServiceManagerSetupOptions,
    ServiceManagerFactory,
    SetupHelpers
} from 'formular.dev.lib'
import { ServiceManagerProvider, useService } from '../adapters/react'

/**
 * Example 1: Basic form application setup
 */
export const BasicFormApplicationExample = () => {
    // Create a service manager for form applications with all features
    const serviceManager = SetupHelpers.forFormApplication()

    return (
        <ServiceManagerProvider serviceManager={serviceManager}>
            <MyFormComponent />
        </ServiceManagerProvider>
    )
}

/**
 * Example 2: Custom configuration with specific features
 */
export const CustomConfigurationExample = () => {
    const serviceManager = ServiceManagerFactory.create({
        includeCoreManagers: true,
        includeFormularManager: true,
        includeInputEngine: false, // Skip input engine for this app
        includeBaseConfigurations: false,
        customSetup: [
            (_sm) => {
                // Register custom services here
                // sm.registerClass(SMyCustomService, MyCustomService)
            }
        ]
    })

    return (
        <ServiceManagerProvider serviceManager={serviceManager}>
            <MyCustomComponent />
        </ServiceManagerProvider>
    )
}

/**
 * Example 3: Using setup options directly in provider
 */
export const SetupOptionsExample = () => {
    const setupOptions: IServiceManagerSetupOptions = {
        includeCoreManagers: true,
        includeFormularManager: true,
        includeInputEngine: true,
        includeBaseConfigurations: true
    }

    return (
        <ServiceManagerProvider setupOptions={setupOptions}>
            <MyApplicationComponent />
        </ServiceManagerProvider>
    )
}

/**
 * Example 4: Hierarchical DI with scoped service managers
 */
export const HierarchicalDIExample = () => {
    const parentServiceManager = SetupHelpers.forFormApplication()

    return (
        <ServiceManagerProvider serviceManager={parentServiceManager}>
            <MainApplication />
            {/* Child scope with additional services */}
            <FeatureModule />
        </ServiceManagerProvider>
    )
}

const FeatureModule = () => {
    const parentSM = useService().serviceManager
    const scopedSM = ServiceManagerFactory.createScope(parentSM)

    // Register feature-specific services in the scoped manager
    // scopedSM.registerClass(SFeatureService, FeatureService)

    return (
        <ServiceManagerProvider serviceManager={scopedSM}>
            <FeatureComponent />
        </ServiceManagerProvider>
    )
}

/**
 * Example 5: Testing setup
 */
export const TestingExample = () => {
    // In test files
    let serviceManager: IServiceManager

    beforeEach(() => {
        serviceManager = SetupHelpers.forTesting({
            customSetup: [
                (_sm) => {
                    // Register mock services
                    // sm.registerInstance(SMockService, mockServiceInstance)
                }
            ]
        })
    })

    afterEach(() => {
        serviceManager.dispose()
    })

    // Use serviceManager in tests...
}

/**
 * Example 6: Using the service hook
 */
const ExampleServiceUsageComponent = () => {
    const { getService, getServiceSync } = useService()

    // Example usage (replace SConfigService with actual service symbol):
    // const configService = getService(SConfigService)

    // Example immediate resolution:
    // const validationService = getServiceSync(SValidationService)

    return (
        <div>
            {/* Use your services here */}
            <p>Service hook example component</p>
        </div>
    )
}

/**
 * Example 7: Migration from old system
 */
export const MigrationExample = () => {
    // OLD WAY (deprecated):
    // const { getService } = useService() // This now requires ServiceManagerProvider

    // NEW WAY:
    const serviceManager = SetupHelpers.forFormApplication()

    return (
        <ServiceManagerProvider serviceManager={serviceManager}>
            <MyMigratedComponent />
        </ServiceManagerProvider>
    )
}

// Placeholder components for examples
const MyFormComponent = () => <div>Form Component</div>
const MyCustomComponent = () => <div>Custom Component</div>
const MyApplicationComponent = () => <div>Application Component</div>
const MainApplication = () => <div>Main Application</div>
const FeatureComponent = () => <div>Feature Component</div>
const MyMigratedComponent = () => <div>Migrated Component</div>
