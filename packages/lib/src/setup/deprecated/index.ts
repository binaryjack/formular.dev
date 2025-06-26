/**
 * FORMULAR - Deprecated Items Index
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * @deprecated These items are deprecated and will be removed in a future version.
 * Use ServiceManagerFactory and SetupHelpers instead.
 */

// Deprecated global singleton (use ServiceManagerFactory instead)
export * from './app-lifecycle-instances'

// Deprecated interface (use IServiceManagerSetupOptions instead)
export type { IAppLifeCycleInstance } from './i-app-lifecycle-instances'
