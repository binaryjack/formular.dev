import { ITab } from '../types/i-tab'

export const newTab = (
    id: string,
    label: string,
    path: string,
    icon?: React.ReactNode,
    disabled?: boolean,
    selected?: boolean,
    onClick?: (id: string) => void,
    expanded?: boolean,
    childrens?: ITab[]
): ITab => {
    return {
        id,
        label,
        path,
        icon,
        disabled,
        selected,
        onClick,
        expanded,
        childrens: childrens || []
    } as ITab
}
