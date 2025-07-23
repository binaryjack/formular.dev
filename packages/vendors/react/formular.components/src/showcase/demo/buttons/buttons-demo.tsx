import { Button, IButtonVariant } from '@components/button/button'
import { ComponentSizeType, VariantNameType } from 'formular.design.system'
import { useState } from 'react'

// Convert to arrays for the demo
const ComponentSizeArray: ComponentSizeType[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
const VariantNameArray: VariantNameType[] = [
    'primary',
    'secondary',
    'info',
    'danger',
    'success',
    'warning'
]

// Simple type converters
const getSizeTypeName = (size: string): ComponentSizeType => size as ComponentSizeType
const getVariantTypeName = (variant: string): VariantNameType => variant as VariantNameType

interface IButtonDemo {
    id: string
    title: string
    children?: React.ReactNode | string
    onClickCallback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    variantProperties?: Partial<IButtonVariant>
    loading?: boolean
    icon?: React.ReactNode
    disabled?: boolean
}

const getButtonsCombinations = (
    onClickCallback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) => {
    const disabledStates = [true, false]
    const loadingStates = [true, false]
    const roundedStates = [true, false]

    const buttonCombinations: IButtonDemo[] = []
    let i = 0
    roundedStates
        // .filter((o) => o === true)
        .forEach((rounded) => {
            disabledStates
                // .filter((o) => o === false)
                .forEach((disabled) => {
                    loadingStates
                        // .filter((o) => o === false)
                        .forEach((loading) => {
                            ComponentSizeArray.forEach((size) => {
                                VariantNameArray
                                    // .filter((o) => o === 'primary')
                                    .forEach((variant) => {
                                        if (loading && disabled) return

                                        const tempsize = getSizeTypeName(size)
                                        const tempvariant = getVariantTypeName?.(variant)

                                        const key = `B-${size}-${variant}-${disabled ? '[D]' : ''}-${loading ? '[L]' : ''}-${rounded ? '[R]' : ''}-${i}`
                                        const title = `B-${size}-${variant}`

                                        if (buttonCombinations.find((o) => o.id === key)) return

                                        buttonCombinations.push({
                                            id: `${key}-${i}`,
                                            title: title,
                                            onClickCallback,
                                            variantProperties: {
                                                size: tempsize,
                                                variant: tempvariant,
                                                rounded,
                                                className: 'my-1 hover:ring-1'
                                            },
                                            disabled,
                                            loading
                                        })
                                        i++
                                    })
                            })
                        })
                })
        })

    return buttonCombinations
}

export const ButtonsDemo = () => {
    const [clickedInfo, setClickedInfo] = useState<string[]>([])
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()

        if (!e.currentTarget) return
        const newCol = [...clickedInfo, `${e.currentTarget?.getAttribute('id')} has clicked!`]
        setClickedInfo(newCol)
    }
    const buttonsCombinations = getButtonsCombinations(handleClick)
    return (
        <div className={`p-2 flex flex-1 flex-row w-full h-full bg-slate-50`}>
            <div className={`flex flex-col w-1/3 h-full  bg-slate-100`}>
                <h1>Buttons Demo</h1>
                <p>This is a boilerplate component for demonstrating buttons.</p>
                <div>
                    {clickedInfo.map((e, i) => {
                        return <div key={`${e}-${i}`}>{e}</div>
                    })}
                </div>
            </div>
            <div className={`flex flex-col w-2/3 h-full  `}>
                {buttonsCombinations?.map((e) => {
                    return (
                        <Button key={e.id} {...e}>
                            {e.title}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
