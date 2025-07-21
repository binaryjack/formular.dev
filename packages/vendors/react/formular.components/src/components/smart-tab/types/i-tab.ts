import React from 'react'

export interface ITab {
    id: string
    label: string
    icon?: React.ReactNode
    childrens?: ITab[]
    disabled?: boolean
    selected?: boolean
    onClick?: (id: string) => void
}
