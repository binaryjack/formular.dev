export interface IEventsHanlders {
    handleOnChanged: (data?: any) => void
    handleOnClicked: (data?: any) => void
    handleOnSelected: (data?: any) => void
    handleOnBlur: (data?: any) => void
    handleOnFocus: (data?: any) => void
}
