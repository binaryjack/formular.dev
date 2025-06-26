/**
 * Public symbols for service registration
 *
 * This file centralizes all Symbol exports from the formular.dev.lib library,
 * providing a single entry point for dependency injection symbols used throughout
 * the application. These symbols are used with the Service Manager for type-safe
 * service registration and resolution.
 *
 * Organization:
 * - CORE MANAGERS: Essential business logic managers
 * - INPUT ENGINE: Input field variants and base implementations
 * - FACTORIES & SERVICES: Creation and builder services
 * - PROJECT SERVICES: High-level application services
 * - PROVIDERS & DESCRIPTORS: Configuration and metadata providers
 *
 * Usage Example:
 * ```typescript
 * import { SConfigurationManager, IConfigurationManager } from 'formular.dev.lib'
 *
 * const configManager = serviceManager.getService<IConfigurationManager>(SConfigurationManager)
 * ```
 *
 * @since 1.0.0
 * @author Formular.dev Team
 */

// =============================================
// CORE MANAGERS
// =============================================

// Configuration Manager
export { SConfigurationManager } from './core/managers/configuration-manager/interfaces/i-configuration-manager'

// Formular Manager
export { SFormularManager } from './core/managers/formular-manager/formular-manager.types'

// Value Manager
export { SValueManager } from './core/managers/value-manager/value-manager.types'

// Validation Manager
export { SValidationManager } from './core/managers/validation-manager/constants/s-validation-manager'

// Service Manager
export { SServiceManager } from './core/managers/service-manager/service-manager.types'

// Notification Manager
export {
    SAutoTrackerNotificationManager,
    SNotificationManager
} from './core/managers/notification-manager/notification-manager.types'

// DOM Manager
export { SDomManager } from './core/managers/dom-manager/dom-manager.types'

// Style Manager
export { SStyleManager } from './core/managers/style-manager/style-manager.types'

// Tracking Manager
export {
    STrackingManager,
    STrackingOutputProvider
} from './core/managers/tracking-manager/tracker-manager.types'

// =============================================
// INPUT ENGINE
// =============================================

// Base Input
export { SInputBase } from './core/input-engine/core/input-base/input-base.types'

// Input Variants
export { SCheckBoxBaseInput } from './core/input-engine/variants/check-box-base/check-box-base-input.types'
export { SClickBaseInput } from './core/input-engine/variants/click-base/click-base-input.types'
export { SDrawerBaseInput } from './core/input-engine/variants/drawer-base/drawer-base-input.types'
export { SMaskedBaseInput } from './core/input-engine/variants/masked-base/masked-base-input.types'
export { SNumericBaseInput } from './core/input-engine/variants/numeric-base/numeric-base-input.types'
export { SOptionBaseInput } from './core/input-engine/variants/option-based/option-base-input.types'
export { SRadioBaseInput } from './core/input-engine/variants/radio-base/radio-base-input.types'
export { SSelectBaseInput } from './core/input-engine/variants/select-base/select-base-input.types'
export { STextBaseInput } from './core/input-engine/variants/text-base/text-base-input.types'

// =============================================
// FACTORIES & SERVICES
// =============================================

// Input Factory
export { SInputFactory } from './core/factories/input-factory/input-factory'

// Input Builder Services
export { SBaseInputService } from './core/factories/input-builder-services/base-input-service'
export { SCheckInputService } from './core/factories/input-builder-services/check-input-service'
export { SClickInputService } from './core/factories/input-builder-services/click-input-service'
export { SMaskedInputService } from './core/factories/input-builder-services/masked-input-service'
export { SOptionInputService } from './core/factories/input-builder-services/option-input-service'
export { SRadioInputService } from './core/factories/input-builder-services/radio-input-service'
export { SSelectInputService } from './core/factories/input-builder-services/select-input-service'
export { STextInputService } from './core/factories/input-builder-services/text-input-service'

// =============================================
// PROJECT SERVICES
// =============================================

// Strategy Services
export { STrackingStrategyService } from './project/services/tracking-strategy-service'
export { SValidationStrategyService } from './project/services/validation-strategy-service'
export { SValidationTriggerService } from './project/services/validation-trigger-service'
export { SValueStrategyService } from './project/services/value-strategy-service'

// Other Project Services
export { SFieldDescriptorService } from './project/services/field-descriptor-service'

// =============================================
// PROVIDERS & DESCRIPTORS
// =============================================

// Configuration Providers
export { SInputConfigProvider } from './project/provider/configuration/input-configuration/input-config-provider'

// Field Descriptors
export { SFieldDescriptor } from './core/framework/schema/descriptor/field.descriptor'

// =============================================
// SYMBOL DOCUMENTATION
// =============================================

/**
 * Symbol Registry & Usage Guide
 *
 * This section provides comprehensive documentation for all exported symbols,
 * their purposes, and usage examples.
 *
 * ### Core Architecture
 * The formular.dev.lib library uses a dependency injection pattern where services
 * are registered and resolved using unique symbols. This ensures type safety and
 * prevents naming conflicts.
 *
 * ### Usage Patterns
 *
 * #### 1. Service Registration
 * ```typescript
 * import { SConfigurationManager, ConfigurationManager } from 'formular.dev.lib'
 *
 * // Register a service
 * serviceManager.registerClass(SConfigurationManager, ConfigurationManager, {
 *     singleton: true,
 *     lazy: false
 * })
 * ```
 *
 * #### 2. Service Resolution
 * ```typescript
 * import { SConfigurationManager, IConfigurationManager } from 'formular.dev.lib'
 *
 * // Resolve a service
 * const configManager = serviceManager.getService<IConfigurationManager>(SConfigurationManager)
 * ```
 *
 * #### 3. React Hook Usage
 * ```typescript
 * import { useService } from '@adapters/react/services/use-service'
 * import { SConfigurationManager, IConfigurationManager } from 'formular.dev.lib'
 *
 * function MyComponent() {
 *     const { getService } = useService()
 *     const configManager = getService<IConfigurationManager>(SConfigurationManager)
 *
 *     // Use the service...
 * }
 * ```
 *
 * ### Symbol Categories
 *
 * #### CORE MANAGERS
 * Essential business logic managers that handle core functionality:
 * - `SConfigurationManager`: Application configuration management
 * - `SFormularManager`: Form lifecycle and state management
 * - `SValueManager`: Input value parsing and serialization
 * - `SValidationManager`: Form and field validation logic
 * - `SServiceManager`: Dependency injection container
 * - `SNotificationManager`: Event notification system
 * - `SDomManager`: DOM manipulation utilities
 * - `SStyleManager`: CSS styling and state management
 * - `STrackingManager`: User interaction tracking
 *
 * #### INPUT ENGINE
 * Input field implementations for different data types:
 * - `SInputBase`: Base input field functionality
 * - `STextBaseInput`: Text input fields
 * - `SSelectBaseInput`: Dropdown selection inputs
 * - `SRadioBaseInput`: Radio button inputs
 * - `SNumericBaseInput`: Numeric input fields
 * - `SOptionBaseInput`: Option-based inputs
 * - `SMaskedBaseInput`: Formatted/masked inputs
 * - `SDrawerBaseInput`: Drawer/modal-based inputs
 * - `SClickBaseInput`: Click-triggered inputs
 * - `SCheckBoxBaseInput`: Checkbox inputs
 *
 * #### FACTORIES & SERVICES
 * Creation and builder services for complex objects:
 * - `SInputFactory`: Creates input field instances
 * - `SBaseInputService`: Base input service functionality
 * - Input-specific services (Text, Select, Radio, etc.)
 *
 * #### PROJECT SERVICES
 * High-level application services:
 * - `SValidationStrategyService`: Validation strategy management
 * - `SValidationTriggerService`: Validation trigger configuration
 * - `SValueStrategyService`: Value handling strategies
 * - `STrackingStrategyService`: Tracking strategy management
 * - `SFieldDescriptorService`: Field metadata management
 *
 * #### PROVIDERS & DESCRIPTORS
 * Configuration and metadata providers:
 * - `SInputConfigProvider`: Input configuration management
 * - `SFieldDescriptor`: Field metadata descriptions
 *
 * ### Best Practices
 *
 * 1. **Always use TypeScript interfaces**: Pair symbols with their corresponding interfaces
 *    for type safety.
 *
 * 2. **Prefer singleton services**: Most services should be registered as singletons
 *    to maintain state consistency.
 *
 * 3. **Use lazy loading**: Register services as lazy when they're not immediately needed
 *    to improve startup performance.
 *
 * 4. **Follow naming conventions**: All service symbols start with 'S' followed by
 *    the service name in PascalCase.
 *
 * 5. **Document dependencies**: When creating custom services, document which other
 *    services they depend on.
 *
 * ### Performance Considerations
 *
 * - Services are cached after first resolution when registered as singletons
 * - Lazy services are only instantiated when first requested
 * - Use `serviceManager.lazy<T>(symbol)` for optional dependencies
 * - Dispose of services properly to prevent memory leaks
 *
 * ### Error Handling
 *
 * - Always check if services are available before using them
 * - Use try-catch blocks when resolving services that might fail
 * - Implement proper fallback mechanisms for optional services
 *
 * @since 1.0.0
 * @author Formular.dev Team
 */
