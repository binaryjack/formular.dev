# AppContext and ServiceManager Merge - Migration Guide

## Problem Solved

This merge addresses the following issues:

1. **Context Redundancy**: Having both `ServiceManagerProvider` and `AppContextProvider` with overlapping responsibilities
2. **Broken getConfigurationByPath**: The method wasn't working properly due to duplicated service resolution logic
3. **Complex Provider Nesting**: Reducing the number of context providers for cleaner architecture

## What Changed

### Before (Two Separate Providers)

```tsx
<ServiceManagerProvider
    setupOptions={{
        includeCoreManagers: true,
        includeFormularManager: true,
        includeInputEngine: true,
        includeBaseConfigurations: true
    }}
>
    <AppContextProvider>
        <App />
    </AppContextProvider>
</ServiceManagerProvider>
```

### After (Single Merged Provider)

```tsx
<AppContextProvider
    setupOptions={{
        includeCoreManagers: true,
        includeFormularManager: true,
        includeInputEngine: true,
        includeBaseConfigurations: true
    }}
>
    <App />
</AppContextProvider>
```

## Enhanced Features

### 1. Improved Configuration Access

The `getConfiguration` method now properly uses the service manager instead of reimplementing service resolution:

```tsx
// Before: Potentially broken implementation
const getConfigurationByPath = function <T>(...path: string[]): T | undefined {
    if (configurationManager) {
        const value = configurationManager.getConfigByName(...path) as T
        console.log('getConfigurationByPath', path, value)
        return value
    }
    return undefined
}

// After: Robust implementation using service manager
const getConfigurationByPath = function <T>(...path: string[]): T | undefined {
    try {
        const configurationManager = getService<IConfigurationManager>(SConfigurationManager)
        if (configurationManager) {
            const value = configurationManager.getConfigByName(...path) as T
            console.log('getConfiguration', path, value)
            return value
        }
        console.warn('ConfigurationManager not available')
        return undefined
    } catch (error: any) {
        console.error('Error accessing configuration:', error.message)
        return undefined
    }
}
```

### 2. Direct Service Manager Access

Components can now access both app context and service manager functionality through a single context:

```tsx
const MyComponent = () => {
    const {
        // App context
        media,
        breakpoints,
        holdScroll,
        setHoldScroll,
        // Service manager functionality
        getService,
        getServiceSync,
        serviceManager,
        // Enhanced configuration
        getConfiguration
    } = useAppContext()

    const configValue = getConfiguration('behavior', 'form', 'validationTriggers')

    return <div>...</div>
}
```

### 3. Backward Compatibility

The `useService` hook is maintained for existing code:

```tsx
// This still works the same way
const { getService, getServiceSync, serviceManager } = useService()
```

## Migration Steps

### Step 1: Replace Provider in index.tsx

```tsx
// Remove
import { ServiceManagerProvider } from '@adapters/react'

// Add
import { AppContextProvider } from '@components/context/app-context/app-context-enhanced'

// Update JSX
<AppContextProvider setupOptions={{ ... }}>
    <App />
</AppContextProvider>
```

### Step 2: Update Imports (Optional)

If you want to use the new enhanced context directly:

```tsx
// Old way
import { useService } from '@adapters/react/services/use-service'
import useAppContext from '@components/context/app-context/app-context.context'

// New way (single import)
import useAppContext from '@components/context/app-context/app-context-enhanced.context'
// or use the compatibility hook
import { useService } from '@components/context/app-context/use-service-enhanced'
```

### Step 3: Test Configuration Access

Verify that `getConfiguration` now works properly:

```tsx
const MyComponent = () => {
    const { getConfiguration } = useAppContext()

    // This should now work reliably
    const validationTriggers = getConfiguration('behavior', 'form', 'validationTriggers')

    return <div>...</div>
}
```

## Benefits of the Merge

1. **Simplified Architecture**: Single provider instead of nested providers
2. **Better Performance**: Fewer context re-renders
3. **Fixed Configuration Access**: Proper service manager integration
4. **Cleaner Code**: One place for all app-level context
5. **Better Error Handling**: Consistent error handling across service access
6. **Maintainability**: Single source of truth for app context

## Files Created/Modified

### New Files:

- `app-context-enhanced.context.tsx` - Enhanced context with service manager integration
- `app-context-enhanced.tsx` - Merged provider implementation
- `use-service-enhanced.ts` - Compatibility hook for useService
- `index-enhanced.tsx` - Example usage

### Files to Eventually Replace:

- `app-context.tsx` → `app-context-enhanced.tsx`
- `app-context.context.tsx` → `app-context-enhanced.context.tsx`
- Update imports from `@adapters/react` to use the enhanced versions

This merge provides a cleaner, more maintainable architecture while fixing the configuration access issues you mentioned.
