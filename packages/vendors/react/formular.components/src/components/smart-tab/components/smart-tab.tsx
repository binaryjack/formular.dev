import { ChevronToggleButton } from '@components/chevron-toggle-button/chevron-toggle-button'
import { Toggleable } from '@components/toggleable/toggleable'
import { useToggleableContext } from '@components/toggleable/toggleable.context.hook'
import { Typography } from '@components/typography/typography'
import { cx } from 'formular.design.system'
import { useSmartTabCotext } from '../smart-tabs-container.context'
import { ITab } from '../types/i-tab'

export interface SmartTabProps {
    tab: ITab
    initialState?: 'open' | 'closed'
}

export const SmartTab = ({ tab }: SmartTabProps) => (
    <Toggleable id={`tab-${tab.id}`}>
        <SmartTabToggleable tab={tab} />
    </Toggleable>
)

export const SmartTabToggleable = ({ tab }: SmartTabProps) => {
    const { setToggleState, toggleState } = useToggleableContext()

    const { selectTab } = useSmartTabCotext()

    const handleToggleState = () => {
        if (!tab.childrens) return
        setToggleState(`tab-${tab.id}`)
    }

    const handleClick = (e: React.MouseEvent, id: string) => {
        if (tab.disabled) return

        if (tab.onClick) {
            tab.onClick(id)
        }
        selectTab?.(e, tab)
    }

    const hasChildrens = tab.childrens && tab.childrens.length > 0

    return (
        <>
            <div
                className={cx(
                    'px-4 py-2 cursor-pointer transition-colors flex items-center select-none',
                    tab.selected
                        ? 'border-b-2 border-primary-500 text-primary-700 bg-primary-50'
                        : 'hover:bg-secondary-500',
                    tab.disabled && 'opacity-50 cursor-not-allowed'
                )}
                onClick={(e) => handleClick(e, tab.id)}
                aria-selected={tab.selected}
                role="tab"
                tabIndex={tab.disabled ? -1 : 0}
            >
                {tab.icon && <span className={cx('mr-2')}>{tab.icon}</span>}
                <div className={cx('flex-1 mr-1')}>
                    <Typography size="sm" as="div" className={cx('font-medium')}>
                        {tab.label}
                    </Typography>
                </div>

                {hasChildrens && (
                    <ChevronToggleButton
                        id={`tab-toggle-${tab.id}`}
                        variantProperties={{
                            size: '2xs'
                        }}
                        toggleState={toggleState}
                        handleDrawerOpenState={handleToggleState}
                    />
                )}
            </div>

            {hasChildrens && (
                <div
                    className={cx(
                        'relative flex flex-col bg-gray-800 text-white-200 shadow-lg rounded-md mt-0',
                        toggleState === 'open'
                            ? 'translate-y-0 animation-fade-in flex'
                            : 'translate-y-0 animation-fade-out hidden'
                    )}
                >
                    {tab.childrens?.map((child) => <SmartTab key={child.id} tab={child} />)}
                </div>
            )}
        </>
    )
}
