import React from 'react'
import { useDispatch } from 'react-redux'
import { selectList, toggleMenuSideba, toggleMenuSidebar } from '../store'
import {
    TrashIcon,
    MenuIcon
} from '@heroicons/react/outline'

const List = ({props, deleteList}) => {

    const dispatch = useDispatch()
    const handleClick = (list) => {
        dispatch(selectList(list))
        dispatch(toggleMenuSidebar(false))
    }

    return (
        <div className='relative hover:bg-gray-300/40'>
            <div className='active:scale-[0.98] transition-all ease-out duration-200'>
                <div onClick={() => handleClick(props)} className='flex items-center justify-between h-12  rounded-sm'>
                    <div className='flex items-center w-[100%]'>
                        <MenuIcon className='w-6 h-5 text-blue-900 opacity-60'/>
                        <p className='test-sm ml-2 w-[70%] truncate'>{props.title}</p>
                    </div>
                </div>
                <div className='absolute text-center inset-y-4 right-3'>
                    <TrashIcon onClick={() => deleteList(props.id)} className="text-red-900 opacity-60 hover:text-red-600 hover:opacity-100 w-[1.15rem] h-[1.15rem] cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

export default List
