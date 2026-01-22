import { MissingPropEnum } from '@common/missing-prop.enum'

export const isMissing = function (property: MissingPropEnum, componentName: string): never {
    throw new Error(
        `MISSING ${property}! ${componentName} component requires an ${property}. 
            This is probably due to the instance of the field 
            which has not the right name has it has being declared 
            in the model!`
    )
}
