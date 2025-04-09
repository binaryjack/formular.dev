import { useMemo, useRef } from 'react'
/** This hook aims to ease the use of dom ref avoiding to have to always cast the ref to its current target */
export const useObjectRef = <T extends HTMLElement>() => {
    const mainRef = useRef<T>(null)
    const castedRefObject = useMemo<T>(() => {
        return mainRef?.current as unknown as T
    }, [mainRef?.current])

    return { mainRef, castedRefObject }
}
