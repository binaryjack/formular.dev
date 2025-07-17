import { NotifierDebugUi } from '@adapters/notifier-debug-ui/notifier-debug-ui'
import { useService } from '@adapters/react/services/use-service'
import { Accordion } from '@components/accordion/accordion'
import { INotificationManager, SAutoTrackerNotificationManager } from 'formular.dev.lib'

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
    const { getService } = useService()
    const autoTracker = getService(SAutoTrackerNotificationManager)
    return (
        <div className="sandbox-container flex md:flex-row xs:flex-col 2xs:flex-col p-1 w-full h-auto">
            <div className="sandbox-container flex flex-col flex-auto p-1 w-full bg-gray-100">
                <Accordion id={`validation-options-acc`} title={`Validation Options`}>
                    <div className="validation-controls flex flex-col  w-full">
                        <div className="flex px-1 md:flex-row xs:flex-col 2xs:flex-col w-full ">
                            <div className="flex px-2 flex-col w-full">{childrenMin}</div>
                            <div className="flex px-2  flex-col w-full">{childrenMax}</div>
                        </div>
                        <div className="flex px-1 md:flex-row xs:flex-col 2xs:flex-col w-full ">
                            <div className="flex px-2 flex-col w-full">{childrenMinLength}</div>
                            <div className="flex px-2 flex-col w-full">{childrenMaxLength}</div>
                        </div>
                        <div className="flex px-2 md:flex-row xs:flex-col 2xs:flex-col w-full ">
                            <div className="flex px-2 flex-col w-full">{childrenPattern}</div>
                            <div className="flex px-2 flex-row w-full items-center justify-center">
                                {childrenRequired}
                            </div>
                        </div>
                        <div className="flex px-2 md:flex-row xs:flex-col 2xs:flex-col w-full">
                            {childrenTriggerMode}
                        </div>
                    </div>
                </Accordion>
                <div className="w-full">
                    <div className="input-container w-full mt-4 mb-4">{childrenInput}</div>
                    <h3 className="text-lg font-bold">Submission Object:</h3>
                    {childrenSubmissionObjectResult}
                </div>
            </div>
            <div className="sandbox-container flex flex-col  p-0 w-full h-auto mt-0 bg-white">
                <h1 className="flex p-1">Component Observer Notifications</h1>
                <NotifierDebugUi
                    internalNotifierInstance={(autoTracker as INotificationManager) ?? undefined}
                />
            </div>
        </div>
    )
}
