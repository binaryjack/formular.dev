import { Spinner } from '../spinner/spinner.ui'
import { IStatusIconProps } from './status-icon.types'

export const StatusIcon = ({ id, isLoading, icon, className, ...rest }: IStatusIconProps) => {
    return (
        <div id={id} className={`status-icon ${className ?? ''}`} {...rest}>
            {isLoading ? <Spinner size="2xl" color="danger" /> : icon}
        </div>
    )
}
