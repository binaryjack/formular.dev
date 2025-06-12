export interface IFormsContentFrameProps {
    childrenMax?: React.ReactNode;
    childrenMin?: React.ReactNode;
    childrenMinLength?: React.ReactNode;
    childrenMaxLength?: React.ReactNode;
    childrenPattern?: React.ReactNode;
    childrenRequired?: React.ReactNode;
    childrenTriggerMode?: React.ReactNode;
    childrenInput: React.ReactNode;
    childrenSubmissionObjectResult: React.ReactNode;
}
export declare const FormsContentFrame: ({ childrenMax, childrenMinLength, childrenMaxLength, childrenMin, childrenInput, childrenPattern, childrenRequired, childrenTriggerMode, childrenSubmissionObjectResult }: IFormsContentFrameProps) => import("@emotion/react/jsx-runtime").JSX.Element;
