import React from 'react'
import List from './List'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMenuSidebar } from '../store'
import { ReactSortable } from 'react-sortablejs'
import rearrange from '../services/rearrange'
import { getListApi, createListApi, deleteListApi } from '../services/api'
import {
    SearchIcon,
    PlusIcon,
    CollectionIcon,
    MenuIcon
} from '@heroicons/react/outline'


const Menu = () => {

    const dispatch = useDispatch()

    const [listState, setListState] = useState([])
    const [searchState, setSearchState] = useState('')
    const selectedListTitle = useSelector(store => store?.selectedList?.title)
    const pattern = new RegExp(searchState, 'i')

    const filterList = (list) => {
        if (searchState) {
            let match = pattern.test(list.title)
            if (match) {
                return <List key={list.id} props={list} deleteList={deleteList}/>
            }
            else {
                return []
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
        if (listState.length < 12) {
            let data = {
                title: "New list"
            }
            let newList = await createListApi(data)
            setListState(list => [...list, newList])
        }
    }

    const deleteList = async (id) => {
        await deleteListApi(id)
        setListState(lists => lists.filter(list => list.id !== id))
    }

    useEffect(() => {
        getList()
    }, [selectedListTitle])

    return (
        <div className='relative flex flex-col w-[100%] h-screen'>
                <MenuIcon className='w-7 h-7 mt-10 ml-2 lg:hidden opacity-70' onClick={() => dispatch(toggleMenuSidebar(false))}/>
                <div className='flex flex-row items-center pl-[2%] pt-3'>
                    <img className='mr-3 w-14 h-14 rounded-full' src={'https://images.media-allrecipes.com/userphotos/600x600/8531051.jpg'} alt='user'/>
                    <div className='w-[90%] truncate'>
                        <span className='text-base font-semibold truncate'>Daniel Alejandro Espósito</span>
                        <p className='text-sm text-gray-700'>Active</p>
                    </div>
                </div>
            
            <div className='h-[100%] overflow-auto'>
                
                <div className='relative mx-2 my-4'>
                    <input value={searchState} onChange={(evt) => {setSearchState(evt.target.value)}} className=' min-w-0 focus:ring-0  focus:border-b-2 border-b-2 border-gray-300 border-b-gray-400 shadow-sm rounded-[5px] text-base text-justify h-8 w-[100%]' type="text" placeholder='Search' />
                    <div className='absolute h-4 w-4 right-2 top-2 pointer-events-none'>
                        <SearchIcon className='w-[3.5] h-[3.5] text-gray-500'/>
                    </div>
                </div>
    
                <div className='flex flex-col'>
                    <ReactSortable className='space-y-2 mx-1' list={listState} setList={setListState} ghostClass='blue-background-class' animation={300} onEnd={() => rearrange(listState, 'list')}>
                        {
                            ! listState 
                            ? []
                            : listState.map(list => filterList(list))
                        }
                    </ReactSortable>
                </div>             
            </div>
            
            <div onClick={() => createList()} className=' mx-1 border-t mb-1 cursor-pointer flex items-center justify-between h-12 hover:bg-gray-300/40 rounded-sm'>
                <div className='flex items-center'>
                    <PlusIcon className='w-6 h-5 text-black opacity-60'/>
                    <p className='text-base ml-2'>New list</p>
                </div>
            </div>
            <CollectionIcon className='absolute bottom-[0.83rem] right-0 cursor-not-allowed w-6 h-5 text-black opacity-60 mr-2'/>
        </div>
    )
}

export default Menu
