import { IDebug } from '../debug/debug.types';
interface AppContextProps {
    debug?: IDebug;
    children: React.ReactNode;
}
/**
 * AppContextProvider component that provides application context to its children.
 *
 *
 * @param {AppContextProps} props - The properties for the AppContextProvider component.
 * @param {React.ReactNode} props.children - The child components that will receive the context.
 *
 * @returns {JSX.Element} The AppContextProvider component with the provided context.
 *
 * @description
 * This component initializes the application context and provides it to its children.
 * It uses `useAppDispatch` to dispatch actions and `useSelector` to select state from the Redux store.
 * It also uses `useIsomorphicLayoutEffect` to perform side effects during the render phase.
 *
 * The context output includes:
 * - `currentMessage`: The current message from the state.
 * - `clearCurrentMessage`: A function to clear the current message.
 *
 * The component also renders a `Toast` component along with its children.
 */
declare const AppContextProvider: ({ debug, children }: AppContextProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export { AppContextProvider };
