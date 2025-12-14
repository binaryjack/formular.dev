/**
 * Conditional rendering helper
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const when = function(this: any, condition: boolean, template: any, elseTemplate?: any) {
    return {
        __conditional: true,
        render() {
            return condition ? template : (elseTemplate ?? '')
        }
    }
}
