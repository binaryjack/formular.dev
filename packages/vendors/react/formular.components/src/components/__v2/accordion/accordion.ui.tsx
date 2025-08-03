import { ChevronToggle } from '../chevron-toggle/chevron-toggle.ui'
import { ExpandableDrawer } from '../drawer/variants/expandable-drawer.ui'
import { Label } from '../label/label.ui'
import { Toggleable } from '../toggleable/toggleable'
import { IAccordionProps } from './accordion.types'

export const Accordion = ({ id, title, children, initialState }: IAccordionProps) => {
    return (
        <Toggleable id={`accordion-${id}`} initialState={initialState}>
            <div className="flex flex-col bg-red-100 h-auto  rounded-md shadow-md">
                <div className="flex  w-full items-center justify-between gap-2   bg-red-200 ">
                    <Label htmlFor={`${id}-chevron-toggle`} text={title} />
                    <ChevronToggle
                        id={`${id}`}
                        toggleContextId={`accordion-${id}`}
                        initialToggleState={'idle'}
                    />
                </div>
                <ExpandableDrawer
                    id={`accordion-${id}`}
                    toggleContextId={`accordion-${id}`}
                    position={'top'}
                    size={{ width: 400, height: 900 }}
                >
                    {children}
                </ExpandableDrawer>
            </div>
        </Toggleable>
    )
}
