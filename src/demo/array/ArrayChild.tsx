interface IBooleanChild {
    id: string
    children?: React.ReactNode
}

const ArrayChild = ({ id, children }: IBooleanChild) => {
    return <div id={id}>{children}</div>
}
export default ArrayChild
