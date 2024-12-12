import { MdClose } from 'react-icons/md'
import { SlMagnifier } from 'react-icons/sl'

import { IOptionItem } from '../../../../../dependency/schema/optionsSchema/options.scheme.types'
import { DrawerOpenStateType } from '../../drawer/Drawer.types'

interface ISelectDrawerProps {
    items: IOptionItem[]
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const SelectDrawer = ({ items, drawerOpenState, onSetOpenState }: ISelectDrawerProps) => {
    console.log('SelectDrawer', drawerOpenState)
    return (
        <div className={`list-compact mt-1`}>
            <div className={`items-left ${drawerOpenState === 'open' ? 'open' : 'closed'}`}>
                <div className={` flex flex-row justify-center items-center w-full mt-1 mb-1 `}>
                    <i className={`flex icon-box mr-1 h-6`}>
                        <SlMagnifier />
                    </i>
                    <input className={`flex input-sm-p mr-1 w-full`} />
                    <button className={`btn-sm-p mr-1`} onClick={onSetOpenState}>
                        {<MdClose />}
                    </button>
                </div>

                {items.map((item, index) => {
                    return (
                        <div key={item.id} className={`select-item`}>
                            {item.text}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default SelectDrawer
