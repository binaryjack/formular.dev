import { ITab } from '../types/i-tab'

export interface ITabBuilder {
    new (id: string, label: string): ITabBuilder
    tab: ITab
    _childrens: ITabBuilder[]
    path: (path: string) => ITabBuilder
    component: (component: React.ReactNode) => ITabBuilder
    icon: (icon: React.ReactNode) => ITabBuilder
    disabled: (disabled: boolean) => ITabBuilder
    selected: (selected: boolean) => ITabBuilder
    expanded: (expanded: boolean) => ITabBuilder
    onClick: (onClick: (id: string) => void) => ITabBuilder
    childrens: (childrens: ITabBuilder[]) => ITabBuilder
    build: () => ITab
}
