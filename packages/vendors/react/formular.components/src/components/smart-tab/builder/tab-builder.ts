import { ITab } from '../types/i-tab'
import { ITabBuilder } from './tab-builder.types'

const buildRecursive = (childrens: ITabBuilder[]): ITab[] => {
    const output: ITab[] = []
    for (const c of childrens) {
        if (c._childrens.length > 0) {
            c.tab.childrens = buildRecursive(c._childrens)
        }
        output.push(c.build())
    }
    return output
}

export const TabBuilder = function (this: ITabBuilder, id: string, label: string) {
    this.tab = {
        id: id,
        label: label,
        childrens: [],
        path: '',
        disabled: false,
        selected: false,
        expanded: false,
        onClick: undefined,
        component: undefined,
        icon: undefined
    } as ITab

    this._childrens = []
    this.path = function (this: ITabBuilder, path: string): ITabBuilder {
        this.tab.path = path
        return this
    }
    this.component = function (this: ITabBuilder, component: React.ReactNode): ITabBuilder {
        this.tab.component = component
        return this
    }
    this.icon = function (this: ITabBuilder, icon: React.ReactNode): ITabBuilder {
        this.tab.icon = icon
        return this
    }
    this.disabled = function (this: ITabBuilder, disabled: boolean): ITabBuilder {
        this.tab.disabled = disabled
        return this
    }
    this.selected = function (this: ITabBuilder, selected: boolean): ITabBuilder {
        this.tab.selected = selected
        return this
    }
    this.expanded = function (this: ITabBuilder, expanded: boolean): ITabBuilder {
        this.tab.expanded = expanded
        return this
    }
    this.onClick = function (this: ITabBuilder, onClick: (id: string) => void): ITabBuilder {
        this.tab.onClick = onClick
        return this
    }
    /** Do not build childrens */
    this.childrens = function (this: ITabBuilder, childrens: ITabBuilder[]): ITabBuilder {
        this._childrens = childrens

        return this
    }
    this.build = function (this: ITabBuilder): ITab {
        if (this._childrens.length > 0) {
            this.tab.childrens = buildRecursive(this._childrens)
        }
        return this.tab
    }
} as any as ITabBuilder
