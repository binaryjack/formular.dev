import { ScreenElement } from './ScreenElement'

const Positionning = () => {
    return (
        <div
            className={`relative flex flex-col justify-center items-center w-full h-full bg-slate-200`}
        >
            <div className={`p-2 m-2 flex flex-col flex-1 h-full w-full bg-slate-100  text-wrap `}>
                <h1>Dynamic Drawer Position</h1>
                <p className={`flex my-2 justify-start w-full`}>
                    In this demo section I'll focus on the drawer openning and position while
                    resizing and / or scrolling.
                </p>
                <p className={`flex my-2 justify-start w-full`}>
                    We first have a Parent which contains children components: `ScreenElement` which
                    implements:
                </p>
                <ol
                    className={`flex flex-col mx-5 p-5 my-2  justify-start items-start w-full  list-disc`}
                >
                    <li>
                        `Drawer`: agnostic drawer components which is responsible to render any king
                        of children.
                    </li>
                    <li>
                        The `Drawer` component implements Portals for the children and the close
                        button.
                    </li>
                    <li>
                        `DrawerSlot` a derived `PortalSlot` component which is responsible to ease
                        the drawer rendering at the required spot.{' '}
                    </li>
                </ol>
                <p className={`flex my-2 justify-start w-full`}>
                    We first have a Parent which contains children components: `ScreenElement` which
                    implements:
                </p>
                <p className={`flex my-2 justify-start w-full`}>
                    The `ScreenElement` components are dynamically rendered and represent individual
                    elements that can interact with the `Drawer` system. Each `ScreenElement` has a
                    unique `id` and `name` to identify and manage its behavior.
                </p>
                <p className={`flex my-2 justify-start w-full`}>
                    The `Drawer` system is designed to handle dynamic positioning and resizing. It
                    ensures that the drawer remains responsive to user interactions such as
                    scrolling or resizing the viewport. This is achieved through the use of portals,
                    which allow the drawer to render outside the normal DOM hierarchy while
                    maintaining its logical connection to the parent component.
                </p>
                <p className={`flex my-2 justify-start w-full`}>
                    The `DrawerSlot` component simplifies the process of specifying where the drawer
                    should appear on the screen. By using `DrawerSlot`, developers can easily manage
                    the placement and behavior of the drawer without manually handling complex
                    positioning logic.
                </p>
                <p className={`flex my-2 justify-start w-full`}>
                    This setup provides a flexible and scalable solution for managing dynamic UI
                    components, making it easier to build interactive and responsive layouts.
                </p>
                <p className={`flex my-2 justify-start w-full`}>
                    The `useCenterElementTrigger` hook plays a crucial role in the `ScreenElement`
                    children components. It is responsible for detecting when a specific element (in
                    this case, a `ScreenElement`) is centered within the viewport. This hook enables
                    dynamic interactions and behaviors based on the element's position relative to
                    the user's view.
                </p>
                <p className={`flex my-2 justify-start w-full`}>
                    The `useCenterElementTrigger` hook typically uses browser APIs such as
                    `IntersectionObserver` or scroll event listeners to monitor the position of the
                    target element. When the element is detected to be centered in the viewport, the
                    hook triggers a callback or updates a state variable, allowing the component to
                    respond accordingly.
                </p>
                <ol className={`flex flex-col mx-5 p-5  my-2 justify-start w-full list-disc`}>
                    <li>
                        It enables the `ScreenElement` to notify the parent or other components when
                        it becomes the focal point of the user's view.
                    </li>
                    <li>
                        This behavior can be used to dynamically open or position the `Drawer`
                        component relative to the centered `ScreenElement`.
                    </li>
                    <li>
                        It ensures that the UI remains responsive and interactive, adapting to user
                        actions such as scrolling or resizing.
                    </li>
                </ol>
                <p className={`flex my-2 justify-start w-full`}>
                    The `useCenterElementTrigger` hook enhances the user experience by enabling
                    context-aware interactions. For example, when a `ScreenElement` becomes centered
                    in the viewport, the `Drawer` can automatically open or adjust its position to
                    align with the element, creating a seamless and intuitive interface.
                </p>
                <p className={`flex my-2 justify-start w-full`}>
                    This setup is particularly useful in scenarios where the UI needs to react to
                    user navigation or scrolling, such as highlighting specific sections, triggering
                    animations, or displaying contextual information.
                </p>
                <p className={`flex my-2 justify-start w-full`}>
                    By leveraging `useCenterElementTrigger`, developers can build dynamic and
                    responsive layouts that adapt to user interactions, improving usability and
                    engagement.
                </p>
            </div>

            <ScreenElement id={`element1`} name={`element 1`} />
            <ScreenElement id={`element2`} name={`element 2`} />
            <ScreenElement id={`element3`} name={`element 3`} />
            <ScreenElement id={`element4`} name={`element 4`} />
            <ScreenElement id={`element5`} name={`element 5`} />
            <ScreenElement id={`element6`} name={`element 6`} />
            <ScreenElement id={`element7`} name={`element 7`} />
            <ScreenElement id={`element8`} name={`element 8`} />
            <ScreenElement id={`element9`} name={`element 9`} />
            <ScreenElement id={`element10`} name={`element 10`} />
            <ScreenElement id={`element11`} name={`element 11`} />
            <ScreenElement id={`element12`} name={`element 12`} />
            <ScreenElement id={`element13`} name={`element 13`} />
            <ScreenElement id={`element14`} name={`element 14`} />
            <ScreenElement id={`element15`} name={`element 15`} />
            <ScreenElement id={`element16`} name={`element 16`} />
            <ScreenElement id={`element17`} name={`element 17`} />
            <ScreenElement id={`element18`} name={`element 18`} />
        </div>
    )
}

export default Positionning
