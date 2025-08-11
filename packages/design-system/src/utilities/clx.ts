export interface IClx {
    className?: string
    condition?: boolean
}

export const clx = (...classes: (IClx | string)[]): string => {
    const output: string[] = []
    for (const c of classes) {
        if (typeof c === 'string') {
            if (!c) continue
            output.push(c)
        } else {
            if (!c.className) continue

            if (c?.condition !== false) {
                output.push(c.className)
            }
        }
    }
    return output.join(' ')
}
