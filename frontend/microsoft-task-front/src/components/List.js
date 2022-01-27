import React from 'react'
import {
    MenuIcon
} from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { selectList } from '../store'
import {
    TrashIcon
} from '@heroicons/react/outline'

const List = ({props, deleteList}) => {
    const dispatch = useDispatch()

    const handleClick = (list) => {
        dispatch(selectList(list))
    }

    return (
        <div className='relative'>
            <div onClick={() => handleClick(props)} className='flex items-center justify-between h-12 hover:bg-gray-300/40 rounded-sm'>
                <div className='flex items-center'>
                    <MenuIcon className='w-6 h-5 text-blue-900 opacity-60'/>
                    <p className='text-sm ml-2'>{props.title}</p>
                </div>
            </div>
            <div className='absolute text-xs text-center inset-y-4 right-3'>
                <TrashIcon onClick={() => deleteList(props.id)} className="text-red-900 opacity-60 hover:text-red-600 hover:opacity-100 w-4 h-4 cursor-pointer"/>
            </div>
        </div>
    )
}

export default List
