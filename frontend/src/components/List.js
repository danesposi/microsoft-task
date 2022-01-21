import React from 'react'
import {
    MenuIcon
} from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { selectList } from '../store'

const List = ({props}) => {
    const dispatch = useDispatch()

    const handleClick = (id) => {
        dispatch(selectList(id))
    }

    return (
        <div onClick={() => handleClick(props.id)} className='flex items-center justify-between h-12 hover:bg-gray-300/40 rounded-sm'>
            <div className='flex items-center'>
                <MenuIcon className='w-6 h-5 text-blue-900 opacity-60'/>
                <p className='text-sm ml-2'>{props.title}</p>
            </div>
            <div className='bg-gray-200 rounded-full w-4 h-4 text-xs text-center mr-2'>
                <p>{3}</p>
            </div>
        </div>
    )
}

export default List
