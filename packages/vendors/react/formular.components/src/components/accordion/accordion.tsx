import { Toggleable } from '@components/toggleable/toggleable'

import { ToggleableStateType } from 'formular.dev.lib'
import { AccordionContainer } from './accordion-container'
export interface IAccordionProps {
    id: string
    children?: React.ReactNode
    initialState?: ToggleableStateType
    title: string
}

export const Accordion = ({ id, title, children, initialState = 'closed' }: IAccordionProps) => {
    return (
        <Toggleable>
            <AccordionContainer id={id} title={title} initialState={initialState}>
                {children}
            </AccordionContainer>
        </Toggleable>
    )
}
