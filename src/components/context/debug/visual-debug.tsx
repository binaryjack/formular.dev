import { IDebug } from './debug.types'
import { DebugContextProvider, IVisualDebugContext } from './visual-debug.context'

interface IVisualDebugProps {
    options?: IDebug
    children: React.ReactNode
}

export const VisualDebug = ({ options, children }: IVisualDebugProps) => {
    const visualDebugContextValue: IVisualDebugContext = {
        options: options
    }

    return (
        <DebugContextProvider.Provider value={visualDebugContextValue}>
            {children}
        </DebugContextProvider.Provider>
    )
}
