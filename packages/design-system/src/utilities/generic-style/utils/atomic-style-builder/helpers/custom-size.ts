export const customSize = (property: string, parameter?: string): string | undefined => {
    if (!parameter) return
    return `${property}-[${parameter}]`
}
