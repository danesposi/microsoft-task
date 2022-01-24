import React from 'react'
import {
    SearchIcon,
    PlusIcon,
    CollectionIcon
} from '@heroicons/react/outline'
import List from './List'
import { getListApi, createListApi } from '../services/api'
import { useEffect } from 'react'
import { useState } from 'react'


const Menu = () => {

    const [listState, setListState] = useState()

    const getList = async () => {
        const listItems = await getListApi()
        setListState(listItems)
    }

    const createList = async () => {
        let data = {
            title: "New title"
        }
        let newList = await createListApi(data)
        setListState(list => [...list, newList])
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div className='relative flex flex-col'>
            {/* Miniprofile */}
            <div>
                <div className='flex flex-row items-center mb-3 mx-3'>
                    <img className='w-12 h-12 rounded-full' src={'https://images.media-allrecipes.com/userphotos/600x600/8531051.jpg'} alt='random picture'/>
                    <div className='truncate ml-3'>
                        <span className='text-sm font-semibold'>Daniel Alejandro Espósito Briceño</span>
                        <p className='text-xs text-gray-700'>Active</p>
                    </div>
                </div>
            </div>
            {/* List Things */}
            <div className='h-[100%]'>
                {/* Search Bar */}
                <div className='relative mx-3 mb-5'> 
                    <input className=' pl-3 mx-1 border border-b-gray-500 shadow-sm rounded-[5px] text-sm text-justify h-8 w-[100%]' type="text" placeholder='Search' />
                    <div className='absolute h-4 w-4 right-2 top-2 pointer-events-none'>
                        <SearchIcon className='w-[3.5] h-[3.5] text-gray-500'/>
                    </div>
                </div>
                {/* Lists */}
                <div className='flex flex-col ml-2 space-y-2'>
                    {
                        !listState 
                        ? null
                        : listState.map(list => <List key={list.id} props={list}/>)
                    }
                </div>
            </div>
            {/* New List */}
            <div onClick={() => createList()} className='relative cursor-pointer flex items-center justify-between h-12 hover:bg-gray-300/40 rounded-sm ml-2'>
                <div className='flex items-center'>
                    <PlusIcon className='w-6 h-5 text-black opacity-60'/>
                    <p className='text-sm ml-2'>New list</p>
                </div>
            </div>
            <CollectionIcon className='absolute bottom-[0.60rem] right-0 cursor-not-allowed w-6 h-5 text-black opacity-60 mr-2'/>
        </div>
    )
}

export default Menu
