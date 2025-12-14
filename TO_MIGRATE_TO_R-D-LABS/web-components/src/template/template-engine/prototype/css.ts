/**
 * CSS template literal tag function
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const css = function(this: any, strings: TemplateStringsArray, ...values: any[]): string {
    let result = ''
    
    for (let i = 0; i < strings.length; i++) {
        result += strings[i]
        if (i < values.length) {
            result += String(values[i])
        }
    }
    
    return result
}
