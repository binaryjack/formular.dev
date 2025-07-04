/**
 * Manager Factory exports
 * Following CONTRIBUTING.md: Index file for all exports
 */

export type { IManagerFactory } from './interfaces/i-manager-factory'
export { ManagerFactory, createWebComponentManagers, defaultManagerConfig, managerFactory, validateWebComponentManagers, webComponentManagers } from './manager-factory'
export { WebComponentDomManager, WebComponentNotificationManager, WebComponentStyleManager } from './prototype/web-component-managers'

