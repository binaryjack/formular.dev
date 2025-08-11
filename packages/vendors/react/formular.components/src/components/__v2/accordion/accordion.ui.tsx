import { cx, genericStyle } from 'formular.design.system'
import { ChevronToggle } from '../chevron-toggle/chevron-toggle.ui'
import { ExpandableDrawer } from '../drawer/variants/expandable-drawer.ui'
import { Label } from '../label/label.ui'
import { Toggleable } from '../toggleable/toggleable'
import { IAccordionProps } from './accordion.types'

export const Accordion = ({
    id,
    title,
    children,
    initialState,
    variants = {}
}: IAccordionProps) => {
    const styles = genericStyle({
        componentTypes: ['accordion', 'typography'],
        ...variants
    })

    return (
        <div
            id={`accordion-${id}-frame`}
            className={cx(styles.backGround, styles.borders, ...Object.values(styles.states))}
        >
            <Toggleable
                id={`accordion-${id}`}
                initialState={initialState}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    width: 'auto'
                }}
            >
                <div className={`relative flex  w-full items-center justify-between gap-2 `}>
                    <Label
                        htmlFor={`${id}-chevron-toggle`}
                        text={title}
                        className={cx(styles.text, 'ml-2')}
                        variants={variants}
                    />
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
                >
                    {children}
                </ExpandableDrawer>
            </Toggleable>
        </div>
    )
}
