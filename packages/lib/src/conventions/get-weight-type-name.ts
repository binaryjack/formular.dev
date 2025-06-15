import { TextWeightArray } from './text-weight-array'
import { TextWeightType } from './types/text-weight.type'

export const getWeightTypeName = (weight: string): TextWeightType =>
    Object.keys(TextWeightArray).find((o) => o === weight) as TextWeightType
