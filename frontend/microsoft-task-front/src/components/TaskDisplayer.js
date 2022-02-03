import React from 'react'
import Task from './Task'
import { selectList, toggleMenuSidebar } from '../store'
import { ReactSortable } from 'react-sortablejs'
import rearrange from '../services/rearrange'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTaskByListApi, createTaskApi, modifyListTitleApi } from '../services/api'
import {
    UserAddIcon,
    DotsHorizontalIcon,
    PlusIcon,
    MenuIcon
} from '@heroicons/react/outline'


const TaskDisplayer = () => {

    const dispatch = useDispatch()
    const globalState = useSelector(store => store)

    // TASK FUNCTIONS, STATE & HANDLERS

    const selectedTaskTitle = globalState?.selectedTask?.title
    const [taskState, setTaskState] = useState([])
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
        if (taskState.length < 10) {
            const data = {
                title: taskTitle,
                important: false,
                done: false,
                list: selectedListId
            }
            createTask(data)
            setTaskTitle('')
        }
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
        <div className='bg-blue-800/90 opacity-80 rounded-tl-lg h-screen '>
            <div className='flex flex-col justify-between h-screen'>
                <div className='flex flex-col my-12 mx-12'>
                    <MenuIcon className='lg:hidden w-6 h-6 text-zinc-50 mb-5' onClick={() => dispatch(toggleMenuSidebar(true))}/>
                    <div className='flex items-center justify-between mb-5'>
                        <input onChange={(evt) => setListTitle(evt.target.value)} onBlur={handleSubmitListTitle} value={listTitle} className='min-w-0 flex-shrink-0 flex-1 text-2xl truncate text-zinc-50 font-semibold placeholder-black focus:outline-none focus:text-black focus:bg-slate-50 bg-inherit cursor-default focus:cursor-text'></input>
                        <div className='flex items-center'>
                            <UserAddIcon className='bg-zinc-50/60 w-5 h-5 rounded-md cursor-not-allowed'/>
                            <DotsHorizontalIcon className='text-zinc-50 w-5 h-5 ml-5 cursor-not-allowed'/>
                        </div>
                    </div> 

            
                    <div className='flex flex-col flex-1 overflow-auto'>
                        <ReactSortable list={taskState} setList={setTaskState} ghostClass='blue-background-class' animation={300} onEnd={() => rearrange(taskState, 'task')}>
                            {
                                !taskState
                                ? null
                                : taskState.map(task => <Task key={task.id} props={task} setTaskState={setTaskState}/>)
                            }
                        </ReactSortable>
                    </div> 
                </div>
            <div className='rounded-md bg-slate-100/75 mt-2 mx-12 my-12'>
                <form className='flex items-center mx-5 ' onSubmit={handleSubmitTask}>
                    <PlusIcon className='h-6 w-6 mr-3 pointer-events-none'/>
                    <input maxLength={80} value={taskTitle} onChange={(evt) => setTaskTitle(evt.target.value)} className='text-lg min-w-0 pt-4 pb-4 flex-1 bg-slate-100/5 focus:outline-none placeholder-black placeholder-opacity-100' placeholder='Add task'></input>
                </form>
            </div>             
            </div>
        </div>
    )
}

export default TaskDisplayer
