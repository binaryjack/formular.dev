import { CSSProperties } from 'react'
import { CenterElementDebug } from '../../core/hooks/screen/CenterElementDebug'
import { useCenterElementTrigger } from '../../core/hooks/screen/useCenterElement'

const style: CSSProperties = {
    position: 'absolute',
    background: 'red',
    display: 'flex',
    flexDirection: 'row'
}

interface ScreenElementProps {
    name: string
}

const ScreenElement = ({ name }: ScreenElementProps) => {
    const { scrollPosition, elementRef, elementPositionRefs, toggle } = useCenterElementTrigger()

    return (
        <div
            ref={elementRef}
            className={`relative flex flex-col items-center justify-center text-slate-200 font-bold size-64 w-full h-44 bg-orange-800 p-2 m-4`}
        >
            <CenterElementDebug
                centerScreen={scrollPosition.centerScreen}
                parentHeight={elementPositionRefs.height}
                screenTop={scrollPosition.screenTop}
            />
            <h1>
                {name} | {scrollPosition.centerScreen} |{scrollPosition.triggerPoint} | {toggle}
            </h1>
        </div>
    )
}

const Positionning = () => {
    return (
        <div className={`relaive flex flex-col w-full h-full bg-slate-200`}>
            <ScreenElement name={`element 1`} />
            <ScreenElement name={`element 2`} />
            <ScreenElement name={`element 3`} />
            <ScreenElement name={`element 4`} />
            <ScreenElement name={`element 5`} />
            <ScreenElement name={`element 6`} />
            <ScreenElement name={`element 7`} />
            <ScreenElement name={`element 8`} />
            <ScreenElement name={`element 9`} />
            <ScreenElement name={`element 10`} />
            <ScreenElement name={`element 11`} />
        </div>
    )
}

export default Positionning
