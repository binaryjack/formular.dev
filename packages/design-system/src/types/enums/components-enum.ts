export enum ComponentsEnum {
    button = 'button',
    accordion = 'accordion',
    datePicker = 'datePicker',
    card = 'card',
    typography = 'typography',
    baseInput = 'baseInput',
    checkboxInput = 'checkboxInput',
    radioInput = 'radioInput',
    checkGroupInput = 'checkGroupInput',
    dropdown = 'dropdown',
    fieldSet = 'fieldSet',
    label = 'label',
    spinner = 'spinner',
    statusIcon = 'statusIcon',
    drawer = 'drawer',
    chevronToggle = 'chevronToggle',
    smartLayout = 'smartLayout',
    formLayout = 'formLayout'
}

export type ComponentsTypes = keyof typeof ComponentsEnum
export const ComponentsArray: string[] = Object.values(ComponentsEnum)
