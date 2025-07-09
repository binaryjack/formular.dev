import { Typography } from '@components/typography/typography'
import { cx } from 'formular.design.system'
import { ITab } from '../types/i-tab'

export interface SmartTabProps {
    tab: ITab
    onSelect: (id: string) => void
}

export const SmartTab = ({ tab, onSelect }: SmartTabProps) => {
    const handleClick = () => {
        if (tab.disabled) return

        if (tab.onClick) {
            tab.onClick(tab.id)
        }
        onSelect?.(tab.id)
    }

    return (
        <div
            className={cx(
                'px-4 py-2 cursor-pointer transition-colors flex items-center',
                tab.selected
                    ? 'border-b-2 border-primary-500 text-primary-700 bg-primary-50'
                    : 'hover:bg-secondary-50',
                tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={handleClick}
            aria-selected={tab.selected}
            role="tab"
            tabIndex={tab.disabled ? -1 : 0}
        >
            {tab.icon && <span className={cx('mr-2')}>{tab.icon}</span>}
            <div>
                <Typography size="sm" as="div" className={cx('font-medium')}>
                    {tab.label}
                </Typography>
            </div>
        </div>
    )
}
