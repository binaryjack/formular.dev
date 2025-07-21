import { ITab } from '../types/i-tab'

export const newTab = (
    id: string,
    label: string,
    icon?: React.ReactNode,
    disabled?: boolean,
    selected?: boolean,
    onClick?: (id: string) => void,
    childrens?: ITab[]
): ITab => {
    return {
        id,
        label,
        icon,
        disabled,
        selected,
        onClick,
        childrens: childrens || []
    } as ITab
}
