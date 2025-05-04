export interface IIfClass {
    classN: string
    addIf?: boolean
}

export const newIFClass = (classN: string, addIf?: boolean) => {
    return { classN, addIf }
}

export const ifClass = (classes: IIfClass[]) => {
    const output: string[] = []
    for (const i of classes) {
        if (i !== undefined && i !== null && !!i && i.addIf) {
            output.push(i.classN)
        }
    }
    return output.join(' ')
}
