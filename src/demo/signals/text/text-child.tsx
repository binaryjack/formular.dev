//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md

interface ITextChild {
    id: string
    children?: React.ReactNode
}

const TextChild = ({ id, children }: ITextChild) => {
    return <div id={id}>{children}</div>
}
export default TextChild
