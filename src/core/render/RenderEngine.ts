import { notify } from '../notifications/notifications.types'
import { ISignal } from '../signals/signal.type'
import { INode, IRenderEngine } from './render.engine.types'

const createElements = (nodes: INode<unknown>[], rootElement: Element | null) => {
    nodes.forEach((n: INode<unknown>) => {
        const currentElement = rootElement?.querySelector(`[data-id=${n.id}]`) ?? null
        if (!currentElement) {
            console.error(`element with data-id:${n.id} does not exists in the dom`)
            return
        }
        if (n.hasChildrens()) {
            createElements(n.nodes, currentElement)
        } else {
            renderValue(n, currentElement)
        }
    })
}

const renderValue = (n: INode<unknown>, element: Element) => {
    if (n.value === typeof Element) {
        console.log('is HTMLElement')
        element.innerHTML = ''
        element.appendChild(n.value as Element)
    }
    if (n.value === typeof Number) {
        console.log('is number')
        element.innerHTML = n.value as string
    }
    if (n.value === typeof String) {
        console.log('is string')
        element.innerHTML = n.value as string
    }
    if (n.value === typeof Boolean) {
        console.log('is boolean')
        element.innerHTML = (n.value as boolean) ? 'true' : 'false'
    }
}

export const RenderApp = (function () {
    let _renderInstance: IRenderEngine | null = null

    const _RenderEngine = function (this: IRenderEngine, rootId: string) {
        this.rootId = rootId
        this.nodes = []
    } as any as IRenderEngine

    _RenderEngine.prototype = {
        bind: function (signals: Set<ISignal<unknown>>) {
            const appElement = document.querySelector(
                `[sia-id="${this.rootId}"]`
            ) as HTMLButtonElement
            const allChilds = appElement?.getElementsByTagName('*')

            console.log(signals)

            for (const signal of signals) {
                console.log('SIGNAL', signal)
                signal.accept(
                    notify(`${this.id}_render_changed`, this.onChanged.bind(this), 'changed')
                )
            }
            for (const e of allChilds) {
                console.log(e)
            }

            const root = document?.querySelector(`[sia-id=${this.rootId}]`) ?? null
            createElements(this.nodes, root)
        },
        onChanged: function (signal: ISignal<unknown>) {
            const concernedElement = document?.querySelector(`[sia-id=${signal.id}]`) ?? null
            if (concernedElement) concernedElement.innerHTML = signal.value as string
        },
        renderPart: function (node: INode<unknown>) {}
    }

    const getRender = (rootId: string): IRenderEngine => {
        if (!_renderInstance) {
            _renderInstance = new _RenderEngine(rootId)
        }
        return _renderInstance
    }

    return {
        getRender
    }
})()
