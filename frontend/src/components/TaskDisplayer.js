import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskByListApi, createTaskApi, modifyListTitleApi } from '../services/api'
import { selectList } from '../store'
import Task from './Task'
import {
    UserAddIcon,
    DotsHorizontalIcon,
    PlusIcon
} from '@heroicons/react/outline'


const TaskDisplayer = () => {

    const dispatch = useDispatch()

    const [taskState, setTaskState] = useState(null)
    const [taskTitle, setTaskTitle] = useState(null)
    
    const globalState = useSelector(store => store)
    const selectedList = globalState?.taskListReducer?.selectedList
    const selectedTaskTitle = globalState?.taskListReducer?.selectedTask?.title

    const selectedListTitle = selectedList?.title
    const selectedListId = selectedList?.id

    const refreshList = globalState?.refreshReducer?.refreshList
    
    const [listTitle, setListTitle] = useState(selectedListTitle)

    const getTask = async (id) => {
        const taskItem = await getTaskByListApi(id)
        setTaskState(taskItem)
    }

    const createTask = async (data) => {
        const taskItem = await createTaskApi(data)
        setTaskState(task => [...task, taskItem])
    }

    useEffect(() => {
        setListTitle(selectedListTitle)
        getTask(selectedListId)
    }, [selectedListId, selectedTaskTitle])


    const handleSubmit = (evt) => {
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

    const handleTaskInput = (evt) => {
        setTaskTitle(evt.target.value)
    }

    const modifyListTitle = async (id, data) => {
        const listItem = await modifyListTitleApi(id, data)
        dispatch(selectList(listItem))
    }

    const handleListTitleSubmit = () => {
        let data = {
            title: listTitle,
            id: selectedListId
        }
        modifyListTitle(selectedListId, data)
    }

    return (
        <div className='flex h-[100%] w-[100%]'>
            <div className='flex flex-col mx-16 my-10 w-[100%]'>
                <div className='flex items-center mb-5'>
                    <input onChange={(evt) => setListTitle(evt.target.value)} onBlur={handleListTitleSubmit} value={listTitle} className='flex-1 text-2xl text-zinc-50 font-semibold placeholder-black focus:outline-none focus:text-black focus:bg-slate-50 bg-inherit cursor-default focus:cursor-text'></input>
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
                    <form className='flex items-center mx-5 ' onSubmit={handleSubmit}>
                        <PlusIcon className='h-6 w-6 mr-3 pointer-events-none'/>
                        <input value={taskTitle} onChange={handleTaskInput} className='pt-4 pb-4 flex-1 bg-slate-100/5 focus:outline-none placeholder-black placeholder-opacity-100' placeholder='Add task'></input>
                    </form>
                </div>                
            </div>
        </div>
    )
}

export default TaskDisplayer
