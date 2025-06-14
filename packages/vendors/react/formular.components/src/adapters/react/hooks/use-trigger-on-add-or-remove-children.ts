import { useEffect, useRef, useState } from 'react'

/**
 * useTriggerOnAddOrRemoveChildren
 *
 * React hook that provides a ref and a trigger state which updates when children are added to or removed from the referenced DOM element.
 *
 * @template T - The type of HTMLElement to be referenced.
 * @returns {{ trigger: ChildrenAppendingStatusType, elementRef: React.RefObject<T> }}
 *   - trigger: 'hasChilds' if the element has children, 'hasNoChilds' otherwise
 *   - elementRef: ref to be attached to the target DOM element
 *
 * @example
 * const { trigger, elementRef } = useTriggerOnAddOrRemoveChildren<HTMLDivElement>();
 * return <div ref={elementRef}>{...}</div>;
 */
export type ChildrenAppendingStatusType = 'hasChilds' | 'hasNoChilds'
export const useTriggerOnAddOrRemoveChildren = <T extends HTMLElement>() => {
    const elementRef = useRef<T>(null)
    const [trigger, setTrigger] = useState<ChildrenAppendingStatusType>('hasNoChilds')
    useEffect(() => {
        const observer = new MutationObserver(() => {
            if (elementRef.current) {
                setTrigger(elementRef.current.children.length > 0 ? 'hasChilds' : 'hasNoChilds')
            }
        })

        if (elementRef.current) {
            observer.observe(elementRef.current, { childList: true })
        }
        return () => {
            observer.disconnect()
        }
    }, [])

    return { trigger, elementRef }
}
