import React from 'react'

export interface ITab {
    id: string
    label: string
    path: string
    icon?: React.ReactNode
    component?: React.ReactNode
    childrens?: ITab[]
    disabled?: boolean
    selected?: boolean
    expanded?: boolean
    onClick?: (id: string) => void
}
