import { createContext, useContext } from 'react'

export interface IAccordionContext {
    id: string
    tabIndex?: number
    backgroundClass?: string
    textClass?: string
}

export const accordionContextDefault: IAccordionContext = {
    id: '',
    tabIndex: -1,
    backgroundClass: undefined,
    textClass: undefined
}

export const AccordionContext = createContext<IAccordionContext>(accordionContextDefault)

export const useAccordionContext = () => {
    return useContext<IAccordionContext>(AccordionContext)
}
