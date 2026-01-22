import { IFieldDescriptor } from '../schema/descriptor/field.descriptor'
import { DateObject } from '../types/date/date-object.object'

export const mapObjectToFields = (
    schema: IFieldDescriptor[],
    dataObject: object,
    forceShouldValidate?: boolean
): IFieldDescriptor[] => {
    const output = [...schema]
    const outputFields: IFieldDescriptor[] = []
    if (dataObject) {
        Object.entries(dataObject).forEach((o) => {
            const key = o[0]
            const value = o[1]
            /**
             * For common fields this is straight forward whereas for
             * ^select^ kind of fields:
             * the ID must be before the label
             * I ... List should extends their base  types
             * per instance:
             * export interface IUserRolesList extends IUserRole
             * and in their createSelector  they shoud export ID and Label
             * The ID must be declared above the label.
             */
            const targetField = output.find((f) => f.name === key)
            if (!targetField) return
            targetField.objectValue = null
            targetField.value = null
            targetField.isDirty = false
            if (targetField?.type === 'date') {
                const dateObjectDisplay = new DateObject(undefined, 'display')
                dateObjectDisplay?.parse?.(value as string)
                targetField.objectValue = dateObjectDisplay.dateObject
            }
            if (targetField.validationOptions !== undefined && forceShouldValidate) {
                targetField.shouldValidate = forceShouldValidate
            }
            // if (targetField?.type === 'select') {
            //     targetField.value = value
            // } else {
            // }
            targetField.value = value
            targetField.loaded = true

            // if (Number(key) > 0) {
            //     if (targetField.validationOptions?.required?.required) {
            //         if (
            //             targetField.value === undefined &&
            //             targetField.objectValue === undefined
            //         ) {
            //             targetField.isValid = false
            //         }
            //     }
            // } else {
            //     targetField.isValid = true
            // }
            targetField.isValid = true

            if (targetField) outputFields.push({ ...targetField })
        })
    }
    return outputFields.sort((a, b) => a.id - b.id)
}

export const mapFieldsToObject = (fields: IFieldDescriptor[]): object => {
    let outputItem = {}

    const newFields = [...fields].sort((a, b) => a.id - b.id)

    newFields.forEach((f) => {
        if (f.name === 'id') {
            outputItem = {
                ...outputItem,
                [f.name]: !f?.value || Number(f?.value) < 0 ? -1 : Number(f?.value)
            }
        } else {
            const value = '' /// getFieldValue(f)
            outputItem = { ...outputItem, [f.name]: value }
        }
    })

    return outputItem
}
