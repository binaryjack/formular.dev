import { ISignal } from '../observers/signals/signal.type'

export type TNodeValue = undefined | null | unknown | string | number | boolean | bigint | Element

export interface INode<T extends Element | unknown> {
    new (id: string, children: INode<unknown>[]): INode<T>
    id: string
    element?: T
    nodes: INode<unknown>[]
    value: TNodeValue
    hasChildrens: () => boolean
}

export interface IRenderEngine {
    new (rootId: string): IRenderEngine
    rootId: string
    nodes: INode<unknown>[]

    bind: (signals: Set<ISignal<unknown>>) => void
    onChanged: (signal: ISignal<unknown>) => void
    renderPart: (node: INode<unknown>) => void
}
