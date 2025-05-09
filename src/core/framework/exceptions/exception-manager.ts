export interface IAssertor {
    isTrue: boolean
    message: string
}

export const newAssert = (isTrue: boolean, message: string) => {
    return {
        isTrue,
        message
    }
}

export interface IExceptionManager {
    new (...assertions: IAssertor[]): IExceptionManager
    accept: (assertion: IAssertor) => void
    assertors: IAssertor[]
    errors: string[]
    hasErrors: () => boolean
    process: () => void
    toString: () => string
}

export const accept = function (this: IExceptionManager, assertion: IAssertor) {
    this.assertors.push(assertion)
}

export const hasErrors = function (this: IExceptionManager): boolean {
    return this.errors.length > 0
}

export const toString = function (this: IExceptionManager) {
    return this.errors.join('\n')
}

export const process = function (this: IExceptionManager) {
    for (const a of this.assertors) {
        if (a.isTrue) continue
        this.errors.push(a.message)
    }
}

export const ExceptionManager = function (this: IExceptionManager, ...assertions: IAssertor[]) {
    this.assertors = assertions ?? []
    this.errors = []
    this.accept = accept
    this.process = process
    this.toString = toString
    this.hasErrors = hasErrors
} as any as IExceptionManager
