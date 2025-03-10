export const uniqueClass = (classes: string[]) => {
    const output: string[] = []
    for (const i of classes) {
        if (i !== undefined && i !== null && !!i) {
            output.push(i)
        }
    }
    return output.join(' ')
}
