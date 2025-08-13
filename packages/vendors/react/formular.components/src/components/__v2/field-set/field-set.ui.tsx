import { generateLayoutClasses } from 'formular.design.system'
import { IFieldSetProps } from './field-set.types'

export const FieldSet = ({ buttons, input, label, layout, layoutSet, ...rest }: IFieldSetProps) => {
    const { fieldSetClasses } = generateLayoutClasses({ layout, layoutSet })
    return (
        <div
            className={`flex flex-row items-center justify-between flexy-1 bg-slate-400 ${fieldSetClasses}`}
            {...rest}
            id={`field-set-${rest.id}`}
        >
            <div
                className="
                        flex flex-col 
                        xs:flex-col
                        sm:flex-row
                        md:flex-row
                        lg:flex-row
                        xl:flex-row
                        2xl:flex-row
                        p-0 m-0 h-full flex-1"
            >
                <div
                    className="flex h-full 
                                items-center justify-start
                                xs:justify-start
                                sm:justify-center
                                md:justify-center
                                lg:justify-center
                                xl:justify-center
                                2xl:justify-center
                                "
                >
                    {label}
                </div>

                <div className="flex h-full items-center justify-center">
                    <div className="flex h-full flex-1">{input}</div>
                    <div className="flex h-full">{buttons}</div>
                </div>
            </div>
        </div>
    )
}
