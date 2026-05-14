import { IServiceManager, ServiceIdType } from '../service-manager.types'

export const validateNoCycles = function (this: IServiceManager): void {
    const visited = new Set<ServiceIdType>()
    const visiting = new Set<ServiceIdType>()

    const visit = (identifier: ServiceIdType, path: ServiceIdType[] = []): void => {
        if (visiting.has(identifier)) {
            const cycle = [...path, identifier].map((id) => this.getServiceName(id)).join(' -> ')
            throw new Error(`Circular dependency detected: ${cycle}`)
        }

        if (visited.has(identifier)) return

        visiting.add(identifier)
        const descriptor = this.findServiceDescriptor(identifier)

        if (descriptor && 'dependencies' in descriptor && descriptor.dependencies) {
            for (const dependency of descriptor.dependencies) {
                if (dependency !== null) {
                    visit(dependency, [...path, identifier])
                }
            }
        }

        visiting.delete(identifier)
        visited.add(identifier)
    }

    for (const [identifier] of this.services) {
        if (!visited.has(identifier)) {
            visit(identifier)
        }
    }
}
