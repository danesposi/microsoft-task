import React from 'react'
import {
    SearchIcon,
    PlusIcon,
    CollectionIcon
} from '@heroicons/react/outline'
import List from './List'
import { getListApi, createListApi, deleteListApi } from '../services/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'


const Menu = () => {

    const [listState, setListState] = useState()
    const [searchState, setSearchState] = useState('')
    const selectedListTitle = useSelector(store => store?.taskListReducer?.selectedList?.title)
    const pattern = new RegExp(searchState, 'i')

    const filterList = (list) => {
        if (searchState) {
            let match = pattern.test(list.title)
            if (match) {
                return <List key={list.id} props={list} deleteList={deleteList}/>
            }
        }
        else {
            return <List key={list.id} props={list} deleteList={deleteList}/>
        }
    }

    const getList = async () => {
        const listItems = await getListApi()
        setListState(listItems)
    }

    const createList = async () => {
        let data = {
            title: "New list"
        }
        let newList = await createListApi(data)
        setListState(list => [...list, newList])
    }

    const deleteList = async (id) => {
        await deleteListApi(id)
        setListState(lists => lists.filter(list => list.id !== id))
    }

    useEffect(() => {
        getList()
    }, [selectedListTitle])

    return (
        <div className='relative flex flex-col'>
            {/* Miniprofile */}
            <div>
                <div className='flex flex-row items-center mb-3 mx-3'>
                    <img className='w-12 h-12 rounded-full' src={'https://images.media-allrecipes.com/userphotos/600x600/8531051.jpg'} alt='user'/>
                    <div className='truncate ml-3'>
                        <span className='text-sm font-semibold'>Daniel Alejandro Espósito Briceño</span>
                        <p className='text-xs text-gray-700'>Active</p>
                    </div>
                </div>
            </div>
            {/* List Things */}
            <div className='h-[100%] overflow-auto'>
                {/* Search Bar */}
                <div className='relative mx-3 mb-5'> 
                    <input value={searchState} onChange={(evt) => {setSearchState(evt.target.value)}} className=' pl-3 mx-1 border border-b-gray-500 shadow-sm rounded-[5px] text-sm text-justify h-8 w-[100%]' type="text" placeholder='Search' />
                    <div className='absolute h-4 w-4 right-2 top-2 pointer-events-none'>
                        <SearchIcon className='w-[3.5] h-[3.5] text-gray-500'/>
                    </div>
                </div>
                {/* Lists */}
                <div className='flex flex-col ml-2 space-y-2'>
                    {
                        !listState 
                        ? null
                        : listState.map(list => filterList(list))
                    }
                </div>
            </div>
            {/* New List */}
            <div onClick={() => createList()} className='border-t cursor-pointer flex items-center justify-between h-12 hover:bg-gray-300/40 rounded-sm ml-2'>
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
