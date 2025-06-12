import { IFormular } from '../../core/formular-engine/formular-base/formular-base.types';
interface FormyDebugProps<T extends object> {
    formular: IFormular<T>;
    count?: number;
}
declare const FormularFormDebug: <T extends object>({ formular, count }: FormyDebugProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
export default FormularFormDebug;
