import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getTaskDetailApi, createTaskApi } from '../services/api'
import Task from './Task'
import {
    UserAddIcon,
    DotsHorizontalIcon,
    PlusIcon
} from '@heroicons/react/outline'
import { selectList } from '../store'

const TaskDisplayer = () => {

    const [taskState, setTaskState] = useState()
    const [createTaskState, setCreateTaskState] = useState()
    const [taskTitle, setTaskTitle] = useState()

     const getListDetail = async (id) => {
        const listItem = await getTaskDetailApi(id)
        setTaskState(listItem)
    }

    const createTask = async (data) => {
        const status = await createTaskApi(data)
        setCreateTaskState(status)
    }

    const selectedList = useSelector(store => store.selectedList)

    useEffect(() => {
        getListDetail(selectedList)
    }, [selectedList, createTaskState])

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const data = {
            title: taskTitle,
            note: null,
            important: false,
            done: false,
            list: selectedList
        }
        createTask(data)
        setTaskTitle('')
    }

    const handleTaskInput = (evt) => {
        setTaskTitle(evt.target.value)
    }

    return (
        <div className='flex h-[100%] w-[100%]'>
            <div className='flex flex-col mx-16 my-10 w-[100%]'>
                {/* Header */}
                <div className='flex items-center mb-5'>
                    <h1 className=' flex-1 text-2xl text-zinc-50 font-semibold'>I'm the Title!</h1>
                    <div className='flex items-center'>
                        <UserAddIcon className='bg-zinc-50/60 w-5 h-5 rounded-sm mr-5 cursor-not-allowed'/>
                        <DotsHorizontalIcon className='text-zinc-50 w-5 h-5 cursor-not-allowed'/>
                    </div>
                </div>

                {/* Tasks */}
                <div className='flex flex-col space-y-1 flex-1'>
                    {
                        !taskState
                        ? null
                        : taskState.map(task => <Task props={task}/>)
                    }
                </div>
                {/* Create Task */}
                <div className='rounded-md bg-slate-100/75'>
                    <form className='flex items-center mx-5' onSubmit={handleSubmit}>
                        <PlusIcon className='h-6 w-6 mr-3 pointer-events-none'/>
                        <input value={taskTitle} onChange={handleTaskInput} className='pt-4 pb-4 flex-1 bg-slate-100/5 focus:outline-none placeholder-black placeholder-opacity-100' placeholder='Add task'></input>
                    </form>
                </div>                
            </div>
        </div>
    )
}

export default TaskDisplayer
