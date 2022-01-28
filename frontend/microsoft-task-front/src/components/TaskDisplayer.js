import React from 'react'
import Task from './Task'
import { selectList } from '../store'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskByListApi, createTaskApi, modifyListTitleApi } from '../services/api'
import {
    UserAddIcon,
    DotsHorizontalIcon,
    PlusIcon
} from '@heroicons/react/outline'


const TaskDisplayer = () => {

    const dispatch = useDispatch()
    const globalState = useSelector(store => store)

    // TASK FUNCTIONS, STATE & HANDLERS

    const selectedTaskTitle = globalState?.selectedTask?.title
    const [taskState, setTaskState] = useState(null)
    const [taskTitle, setTaskTitle] = useState(null)

    const getTask = async (id) => {
        const taskItem = await getTaskByListApi(id)
        setTaskState(taskItem)
    }

    const createTask = async (data) => {
        const taskItem = await createTaskApi(data)
        setTaskState(task => [...task, taskItem])
    }
    
    const handleSubmitTask = (evt) => {
        evt.preventDefault()
        const data = {
            title: taskTitle,
            note: null,
            important: false,
            done: false,
            list: selectedListId
        }
        createTask(data)
        setTaskTitle('')
    }

    // LIST FUNCTIONS, STATE & HANDLERS

    const selectedList = globalState?.selectedList
    const selectedListId = selectedList?.id
    const selectedListTitle = selectedList?.title

    const [listTitle, setListTitle] = useState(selectedListTitle)
    
    const modifyListTitle = async (id, data) => {
        const listItem = await modifyListTitleApi(id, data)
        dispatch(selectList(listItem))
    }

    const handleSubmitListTitle = () => {
        let data = {
            title: listTitle,
            id: selectedListId
        }
        modifyListTitle(selectedListId, data)
    }


    useEffect(() => {
        setListTitle(selectedListTitle)
        getTask(selectedListId)
    }, [selectedListId, selectedTaskTitle])

    return (
        <div className='flex h-[100%] w-[100%]'>
            <div className='flex flex-col mx-16 my-10 w-[100%]'>
                <div className='flex items-center mb-5'>
                    <input onChange={(evt) => setListTitle(evt.target.value)} onBlur={handleSubmitListTitle} value={listTitle} className='flex-1 text-2xl text-zinc-50 font-semibold placeholder-black focus:outline-none focus:text-black focus:bg-slate-50 bg-inherit cursor-default focus:cursor-text'></input>
                    <div className='flex items-center'>
                        <UserAddIcon className='bg-zinc-50/60 w-5 h-5 rounded-sm ml-3 mr-5 cursor-not-allowed'/>
                        <DotsHorizontalIcon className='text-zinc-50 w-5 h-5 cursor-not-allowed'/>
                    </div>
                </div>

                {/* Tasks */}
                <div className='flex flex-col space-y-1 flex-1 overflow-auto'>
                    {
                        !taskState
                        ? null
                        : taskState.map(task => <Task key={task.id} props={task} setTaskState={setTaskState}/>)
                    }
                </div>
                {/* Create Task */}
                <div className='rounded-md bg-slate-100/75'>
                    <form className='flex items-center mx-5 ' onSubmit={handleSubmitTask}>
                        <PlusIcon className='h-6 w-6 mr-3 pointer-events-none'/>
                        <input value={taskTitle} onChange={(evt) => setTaskTitle(evt.target.value)} className='pt-4 pb-4 flex-1 bg-slate-100/5 focus:outline-none placeholder-black placeholder-opacity-100' placeholder='Add task'></input>
                    </form>
                </div>                
            </div>
        </div>
    )
}

export default TaskDisplayer
