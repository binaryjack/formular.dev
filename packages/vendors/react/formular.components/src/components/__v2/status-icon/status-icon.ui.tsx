import Spinner from '@components/spinner/spinner'
import { IStatusIconProps } from './status-icon.types'

export const StatusIcon = ({ id, isLoading, icon, className, ...rest }: IStatusIconProps) => {
    return (
        <div id={id} className={`status-icon ${className}`} {...rest}>
            {isLoading ? <Spinner /> : icon}
        </div>
    )
}
