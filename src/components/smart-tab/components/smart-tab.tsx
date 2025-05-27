import { Typography } from '@components/typography/typography'
import { ITab } from '../types/i-tab'
import './smart-tab.css'
export interface SmartTabProps {
    tab: ITab
    onSelect: (id: string) => void
}

export const SmartTab = ({ tab, onSelect }: SmartTabProps) => {
    const handleClick = () => {
        if (tab.onClick) {
            tab.onClick(tab.id)
        }
        onSelect?.(tab.id)
    }

    return (
        <div
            className={`smart-tab ${tab.selected ? 'selected' : ''} ${tab.disabled ? 'disabled' : ''}`}
            onClick={handleClick}
        >
            {tab.icon && <span className="icon">{tab.icon}</span>}
            <div className="label">
                <Typography size={'small'} ellipsis as="div" className="label-text">
                    {tab.label}
                </Typography>
            </div>
        </div>
    )
}
