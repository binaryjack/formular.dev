import { createScope } from './prototype/create-scope'
import { dispose } from './prototype/dispose'
import { findServiceDescriptor } from './prototype/find-service-descriptor'
import { getServiceName } from './prototype/get-service-name'
import { isRegistered } from './prototype/is-registered'
import { lazy } from './prototype/lazy'
import { register } from './prototype/register'
import { registerClass } from './prototype/register-class'
import { registerInstance } from './prototype/register-instance'
import { resolve } from './prototype/resolve'
import { throwIfDisposed } from './prototype/throw-if-disposed'
import { tryResolve } from './prototype/try-resolve'
import { validateNoCycles } from './prototype/validate-no-cycles'
import { IServiceDescriptor, IServiceManager, ServiceIdType } from './service-manager.types'

export const ServiceManager = function (this: IServiceManager, parent?: IServiceManager) {
    Object.defineProperty(this, 'services', {
        value: new Map<ServiceIdType, IServiceDescriptor>(),
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition
        enumerable: true // Make it enumerable for introspection
    })
    Object.defineProperty(this, 'singletonInstances', {
        value: new Map<ServiceIdType, any>(),
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition
        enumerable: true // Make it enumerable for introspection
    })
    Object.defineProperty(this, 'scopedInstances', {
        value: new Map<ServiceIdType, any>(),
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition
        enumerable: true // Make it enumerable for introspection
    })
    Object.defineProperty(this, 'parent', {
        value: parent,
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition
        enumerable: true // Make it enumerable for introspection
    })

    Object.defineProperty(this, 'resolutionStack', {
        value: new Set<ServiceIdType>(),
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition
        enumerable: true // Make it enumerable for introspection
    })

    this.isDisposed = false
} as any as IServiceManager

Object.assign(ServiceManager.prototype, {
    validateNoCycles,
    register,
    registerClass,
    registerInstance,
    resolve,
    tryResolve,
    lazy,
    isRegistered,
    createScope,
    dispose,
    findServiceDescriptor,
    throwIfDisposed,
    getServiceName
})
