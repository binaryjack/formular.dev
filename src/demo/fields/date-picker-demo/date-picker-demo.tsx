import DatePicker from '../../../components/date-picker/date-picker'
import FormyForm from '../../../components/formy/formy.form'

import { demoFormInstance } from './date-picker-demo.form.instance'

export const DatePickerDemo = () => {
    return (
        <FormyForm formy={demoFormInstance}>
            <DatePicker fieldName={'datePickerDemo'} />
        </FormyForm>
    )
}
