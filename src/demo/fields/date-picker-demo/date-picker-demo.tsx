import DatePicker from '../../../components/date-picker/date-picker'
import FormyForm from '../../../components/formy/formy.form'

import { datePickerDemoFormInstance } from './date-picker-demo.form.instance'

export const DatePickerDemo = () => {
    return (
        <FormyForm formy={datePickerDemoFormInstance}>
            <DatePicker fieldName={'datePickerDemo'} />
        </FormyForm>
    )
}
