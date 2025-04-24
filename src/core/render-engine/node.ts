import { INode } from './render-engine.types'

export const Node = function <T extends Element | unknown>(
    this: INode<T>,
    id: string,
    childrens: INode<unknown>[]
) {
    this.id = id
    this.element = undefined
    this.value = undefined
    this.nodes = childrens
}

Node.prototype = {
    hasChildrens: function () {
        return this.nodes?.length > 0
    }
}
