import DatePicker from '@components/date-picker/date-picker'

import FormularForm from '@components/formular-form/formular-form'
import { datePickerDemoFormInstance } from './date-picker-demo.form.instance'

export const DatePickerDemo = () => {
    if (!datePickerDemoFormInstance) {
        return <>Unable to locate datePickerDemoFormInstance!</>
    }
    return (
        <FormularForm formular={datePickerDemoFormInstance}>
            <DatePicker fieldName={'datePickerDemo'} />
        </FormularForm>
    )
}
