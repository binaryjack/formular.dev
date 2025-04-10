import { useEffect, useRef, useState } from 'react'
export type ChildrenAppendingStatusType = 'hasChilds' | 'hasNoChilds'
export const useTriggerOnAddOrRemoveChildren = <T extends HTMLElement>() => {
    const elementRef = useRef<T>(null)
    const [trigger, setTrigger] = useState<ChildrenAppendingStatusType>('hasNoChilds')
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if (m.type === 'childList') {
                    if (m.addedNodes?.length > 0) {
                        setTrigger('hasChilds')
                    }
                    if (m.removedNodes?.length > 0) {
                        setTrigger('hasNoChilds')
                    }
                }
            })
        })

        if (elementRef?.current) {
            observer.observe(elementRef?.current, { childList: true })
        }
        return () => {
            if (elementRef?.current) {
                observer.disconnect()
            }
        }
    }, [])

    return { trigger, elementRef }
}
