/**
 * FORMULAR - Conventions Configuration Migration Helper
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Migration helper for transitioning from hardcoded conventions.ts to ConventionsConfigPresets
 * This provides backwards compatibility while encouraging migration to the preset system
 */

import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { createConfigurationPresetFactory } from './configuration-presets-factory'
import { getConventionsConfigPresets } from './conventions-config-presets'

/**
 * Legacy conventions interface for backward compatibility
 * @deprecated Use ConventionsConfigPresets instead
 */
export interface ILegacyConventions {
    IsMissing: (property: string, componentName: string) => never
    suffix: {
        labelId: string
        describedById: string
    }
    tokens: {
        validationDataToken1: string
        validationDataToken2: string
    }
    validations: {
        triggerDelay: number
    }
    events: {
        onChange: { triggerDelay: number }
        onClick: { triggerDelay: number }
        onSelect: { triggerDelay: number }
        onFocus: { triggerDelay: number }
        onBlur: { triggerDelay: number }
        onKeyDown: { triggerDelay: number }
        onKeyUp: { triggerDelay: number }
        onUiUpdate: { triggerDelay: number }
        observables: { triggerDelay: number }
    }
    dataTypes: {
        date: {
            separator: string
            formatValue: string
            formatDisplay: string
        }
    }
    formular: {
        creation: {
            enforceConfigurationCheck: boolean
        }
    }
    components: {
        drawer: {
            height: string
            width: string
        }
    }
    commands: {
        basic: any
        submit: any
    }
}

/**
 * Creates a legacy conventions object that maps to ConventionsConfigPresets
 * This maintains backward compatibility for existing code while using the new preset system
 *
 * @param sm - Service Manager instance
 * @returns Legacy conventions object powered by ConventionsConfigPresets
 *
 * @deprecated Use createConfigurationPresetFactory(sm).conventions instead
 */
export const createLegacyConventionsFromPresets = function (
    sm: IServiceManager
): ILegacyConventions {
    const conventionsPresets = getConventionsConfigPresets(sm)

    return {
        IsMissing: function (property: string, componentName: string): never {
            throw Error(
                `MISSING ${property.toUpperCase()}! ${componentName} component requires an ${property}. 
                This is probably due to the instance of the field 
                which has not the right name has it has being declared 
                in the model!`
            )
        },

        suffix: {
            labelId: conventionsPresets.uiConventions.suffixes.labelId,
            describedById: conventionsPresets.uiConventions.suffixes.describedById
        },

        tokens: {
            validationDataToken1: conventionsPresets.uiConventions.tokens.validation.primary,
            validationDataToken2: conventionsPresets.uiConventions.tokens.validation.secondary
        },

        validations: {
            triggerDelay: conventionsPresets.eventTriggers.default()
        },

        events: {
            onChange: { triggerDelay: conventionsPresets.eventTriggers.default() },
            onClick: { triggerDelay: conventionsPresets.eventTriggers.default() },
            onSelect: { triggerDelay: conventionsPresets.eventTriggers.default() },
            onFocus: { triggerDelay: conventionsPresets.eventTriggers.default() },
            onBlur: { triggerDelay: conventionsPresets.eventTriggers.default() },
            onKeyDown: { triggerDelay: conventionsPresets.eventTriggers.default() },
            onKeyUp: { triggerDelay: conventionsPresets.eventTriggers.default() },
            onUiUpdate: { triggerDelay: conventionsPresets.uiTriggers.default() },
            observables: { triggerDelay: conventionsPresets.observableTriggers.default() }
        },

        dataTypes: {
            date: {
                separator: conventionsPresets.dataTypes.date.separators.default(),
                formatValue: conventionsPresets.dataTypes.date.formats.value(),
                formatDisplay: conventionsPresets.dataTypes.date.formats.display()
            }
        },

        formular: {
            creation: {
                enforceConfigurationCheck:
                    conventionsPresets.formular.creation.default().enforceConfigurationCheck
            }
        },

        components: {
            drawer: {
                height: conventionsPresets.components.drawer.default().height,
                width: conventionsPresets.components.drawer.default().width
            }
        },

        commands: {
            basic: {
                rounded: true,
                size: 'sm',
                width: conventionsPresets.components.button.default().width,
                height: conventionsPresets.components.button.default().height,
                className: 'ml-0'
            },
            submit: {
                rounded: true,
                size: 'lg',
                width: '5em',
                height: '5em',
                className: 'ml-0'
            }
        }
    }
}

/**
 * Migration examples and best practices
 */
export const ConventionsMigrationExamples = {
    /**
     * Example 1: Direct migration from conventions to presets
     */
    directMigration: (sm: IServiceManager) => {
        const configPresets = createConfigurationPresetFactory(sm)

        // OLD WAY:
        // import { conventions } from './conventions'
        // const delay = conventions.events.onChange.triggerDelay

        // NEW WAY:
        const delay = configPresets.conventions.eventTriggers.default()

        return { delay }
    },

    /**
     * Example 2: Environment-specific conventions
     */
    environmentSpecific: (sm: IServiceManager) => {
        const configPresets = createConfigurationPresetFactory(sm)

        // Get environment-specific convention profile
        const isDevelopment = process.env.NODE_ENV === 'development'
        const conventionProfile = isDevelopment
            ? configPresets.conventions.profiles.developmentProfile()
            : configPresets.conventions.profiles.productionProfile()

        // Use the profile
        const eventDelay = conventionProfile.eventTriggers
        const drawerSize = conventionProfile.components.drawer

        return { eventDelay, drawerSize }
    },

    /**
     * Example 3: Component-specific preset usage
     */
    componentSpecific: (sm: IServiceManager) => {
        const configPresets = createConfigurationPresetFactory(sm)

        // OLD WAY:
        // const drawerHeight = conventions.components.drawer.height

        // NEW WAY with options:
        const smallDrawer = configPresets.conventions.components.drawer.small
        const mediumDrawer = configPresets.conventions.components.drawer.medium
        const largeDrawer = configPresets.conventions.components.drawer.large

        // Or with custom configuration:
        const customConventions = configPresets.conventions.custom.createProfile({
            eventTriggers: 300,
            drawerSize: 'large',
            enforceConfigurationCheck: false
        })

        return { smallDrawer, mediumDrawer, largeDrawer, customConventions }
    },

    /**
     * Example 4: Date formatting migration
     */
    dateFormatting: (sm: IServiceManager) => {
        const configPresets = createConfigurationPresetFactory(sm)

        // OLD WAY:
        // const separator = conventions.dataTypes.date.separator
        // const displayFormat = conventions.dataTypes.date.formatDisplay

        // NEW WAY with locale support:
        const systemSeparator = configPresets.conventions.dataTypes.date.separators.system()
        const dashSeparator = configPresets.conventions.dataTypes.date.separators.dash
        const usFormat = configPresets.conventions.dataTypes.date.formats.forLocale('us')
        const euFormat = configPresets.conventions.dataTypes.date.formats.forLocale('eu')

        return { systemSeparator, dashSeparator, usFormat, euFormat }
    }
}

/**
 * Migration checklist for developers
 */
export const MIGRATION_CHECKLIST = `
🔄 CONVENTIONS MIGRATION CHECKLIST

✅ 1. Setup ConventionsConfigPresets in your service manager
   - Add setupConfigurationServices(sm) to your setup
   - Register conventions presets

✅ 2. Replace direct convention imports
   Before: import { conventions } from './conventions'
   After:  const configPresets = createConfigurationPresetFactory(sm)

✅ 3. Update trigger delay usage
   Before: conventions.events.onChange.triggerDelay
   After:  configPresets.conventions.eventTriggers.default()

✅ 4. Update component dimensions
   Before: conventions.components.drawer.height
   After:  configPresets.conventions.components.drawer.default().height

✅ 5. Update date formatting
   Before: conventions.dataTypes.date.separator
   After:  configPresets.conventions.dataTypes.date.separators.default()

✅ 6. Consider environment-specific profiles
   Use: configPresets.conventions.profiles.productionProfile()

✅ 7. Test backwards compatibility
   Use: createLegacyConventionsFromPresets(sm) for gradual migration

✅ 8. Update tests to use preset mocks

✅ 9. Remove old conventions.ts file when migration is complete

🎯 Benefits after migration:
   - Environment-specific configurations
   - Better type safety and IntelliSense
   - Centralized configuration management
   - Runtime configuration updates
   - Consistent API with other presets
`
