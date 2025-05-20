import { NotifierDebugUi } from '@core/managers/notification-manager/notifier-debug-ui/notifier-debug-ui'
import { lifeCylceInstances } from '@demo/common/common-instances'

export interface IFormsContentFrameProps {
    childrenMax?: React.ReactNode
    childrenMin?: React.ReactNode
    childrenMinLength?: React.ReactNode
    childrenMaxLength?: React.ReactNode
    childrenPattern?: React.ReactNode
    childrenRequired?: React.ReactNode
    childrenTriggerMode?: React.ReactNode
    childrenInput: React.ReactNode
    childrenSubmissionObjectResult: React.ReactNode
}

export const FormsContentFrame = ({
    childrenMax,
    childrenMinLength,
    childrenMaxLength,
    childrenMin,
    childrenInput,
    childrenPattern,
    childrenRequired,
    childrenTriggerMode,
    childrenSubmissionObjectResult
}: IFormsContentFrameProps) => {
    return (
        <div className="sandbox-container flex flex-row p-1 w-full h-full">
            <div className="sandbox-container flex flex-col p-1 w-full h-full">
                <div className="validation-controls w-full">
                    <div className="flex px-1 flex-row w-full ">
                        <div className="flex px-2 flex-col w-full">{childrenMin}</div>
                        <div className="flex px-2  flex-col w-full">{childrenMax}</div>
                    </div>
                    <div className="flex px-1 flex-row w-full ">
                        <div className="flex px-2 flex-col w-full">{childrenMinLength}</div>
                        <div className="flex px-2 flex-col w-full">{childrenMaxLength}</div>
                    </div>
                    <div className="flex px-2  flex-row w-full ">
                        <div className="flex px-2 flex-col w-full">{childrenPattern}</div>
                        <div className="flex px-2 flex-row w-full items-center justify-center">
                            {childrenRequired}
                        </div>
                    </div>
                    <div className="flex px-2  flex-col w-full">{childrenTriggerMode}</div>
                </div>
                <div className="input-container w-full mt-14 mb-20">{childrenInput}</div>
                <div className="w-full">
                    <h3 className="text-lg font-bold">Submission Object:</h3>
                    {childrenSubmissionObjectResult}
                </div>
            </div>
            <div className="sandbox-container flex flex-col p-1 w-full h-full mt-14">
                <NotifierDebugUi internalNotifierInstance={lifeCylceInstances.autoTracker} />
            </div>
        </div>
    )
}
