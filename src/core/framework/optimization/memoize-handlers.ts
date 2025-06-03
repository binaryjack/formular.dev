import { memoize } from './memoize'

export const memoizeHandler = memoize((handler: Function, context: any) => handler.bind(context))
