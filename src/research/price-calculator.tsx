import './index.css'

// const rootComponent = document.getElementById('root')
// const root = ReactDOM.createRoot(rootComponent!)
// root.render(<App />)
import React, { useEffect, useState } from 'react'

document.title = import.meta.env.VITE_APP_NAME ?? ''
const discountTypeList = [
    {
        id: 'standard',
        discount: 6,
        rule: 'any',
        weight: -1
    },
    {
        id: 'seasonal',
        discount: 12,
        rule: 'any',
        weight: -1
    },
    {
        id: 'weight',
        discount: 18,
        rule: 'greater',
        weight: 10
    },
    {
        id: 'weight',
        discount: 6,
        rule: 'lessOrEqual',
        weight: 10
    }
]

const PriceCalculator = () => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [currentDiscountType, setCurrentDiscountType] = useState('standard')
    const [currentWeight, setCurrentWeight] = useState(0)
    const [currentTotalPrice, setCurrentTotalPrice] = useState(0)

    const handleSetDiscountType = (e: any) => {
        const value = e.currentTarget.value
        setCurrentDiscountType(value)
        e.stopPropagation()
    }

    const handleWeightChange = (e: any) => {
        const value = e.currentTarget.value
        setCurrentWeight(value)
        e.stopPropagation()
    }

    const handleTotalPriceChange = (e: any) => {
        const value = e.currentTarget.value
        setCurrentTotalPrice(value)
        e.stopPropagation()
    }

    const calculatePercentage = (price: number, discount: number) => {
        const pct = (price * discount) / 100
        const result = price - pct
        return result
    }

    useEffect(() => {
        const discountType = discountTypeList.find((o) => o.id === currentDiscountType)

        if (!discountType) return

        switch (discountType.rule) {
            case 'greater':
                if (currentWeight > discountType.weight) {
                    setTotalPrice(calculatePercentage(currentTotalPrice, discountType.discount))
                    break
                }
                setTotalPrice(currentTotalPrice)
                break
            case 'lessOrEqual':
                if (currentWeight <= discountType.weight) {
                    setTotalPrice(calculatePercentage(currentTotalPrice, discountType.discount))
                    break
                }
                setTotalPrice(currentTotalPrice)
                break
            case 'any':
            default:
                setTotalPrice(calculatePercentage(currentTotalPrice, discountType.discount))
                break
        }
    }, [currentDiscountType, currentWeight, currentTotalPrice])

    return (
        <div>
            <label htmlFor="type">Select Type:</label>
            <select id="type" name="type" value="standard" onChange={handleSetDiscountType}>
                <option value="standard">Standard</option>
                <option value="seasonal">Seasonal</option>
                <option value="weight">Weight</option>
            </select>

            <label htmlFor="weight">Weight (kg):</label>
            <input
                type="number"
                id="weight"
                name="weight"
                step="0.01"
                onChange={handleWeightChange}
            />

            <label htmlFor="totalPrice">Total Price ($):</label>
            <input
                type="number"
                id="totalPrice"
                name="totalPrice"
                step="0.01"
                onChange={handleTotalPriceChange}
            />

            <div>
                Discounted price:<span id="discountedPrice">{totalPrice}</span>
            </div>
        </div>
    )
}
export default PriceCalculator
