import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStepByTaskApi, createStepApi } from '../services/api';
import { refreshStep, closeSidebar, selectTask } from '../store';
import {
  XIcon,
  CheckCircleIcon,
  PlusIcon,
  StarIcon,
  SunIcon,
  ClockIcon,
  CalendarIcon,
  ClipboardCheckIcon,
  UserAddIcon,
  PaperClipIcon,
  TrashIcon
} from '@heroicons/react/outline';
import { deleteTaskApi } from '../services/api';
import Step from './Step';

const Sidebar = () => {

  const globalState = useSelector(state => state)

  const toggle = globalState?.taskListReducer?.toggle
  const taskTitle = globalState?.taskListReducer?.taskTitle
  const selectedTask = globalState?.taskListReducer?.selectedTask

  const refresh = globalState?.refreshReducer?.refreshStep

  const [stepState, setStepState] = useState(null)

  const [stepTitle, setStepTitle] = useState("")

  const dispatch = useDispatch()

  const createStep = async (data) => {
    const stepItem = await createStepApi(data)
    dispatch(refreshStep())
  } 

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const data = {
      title: stepTitle,
      task: selectedTask,
      done: false
    }
    createStep(data)
    setStepTitle("")
  }

  const deleteTask = async (id) => {
    const status = await deleteTaskApi(id)
    dispatch(refreshStep())
  }

  const onClickClose = () => {
    dispatch(closeSidebar())
  }

  const handleDeleteTask = (id) => {
    deleteTask(id)
  }

  const getStepByTask = async (id) => {
    const step = await getStepByTaskApi(id)
    setStepState(step)
  }

  const handleStepInput = (evt) => {
    setStepTitle(evt.target.value)
  }

  useEffect(() => {
    getStepByTask(selectedTask)
  }, [selectedTask, refresh])

  return (
    <div className={
      !toggle 
      ? 'hidden' 
      : 'hidden md:inline-flex md:h-[100%] xl:inline-flex xl:h-[100%]'
    }>
      <div className='flex space-y-3 flex-col w-[19rem] right-0 md:hidden xl:inline-flex xl:w-[19rem]'>
        <div className='mt-3 mr-3 text-zinc-500'>
          <XIcon onClick={onClickClose} className=' cursor-pointer w-5 h-5 float-right'/>
        </div>
        <div className='border mx-2 bg-white'>
          <div className='flex items-center p-2'>
            <CheckCircleIcon className='w-5 h-5 mr-3'/>
            <h1 className='text-lg font-semibold flex-1'>{taskTitle}</h1>
            <StarIcon className='h-5 w-5 text-zinc-500'/>
          </div>
          <div className='max-h-96 overflow-auto'>
            {
              stepState
              ? stepState.map(step => <Step key={step.id} props={step}/>)
              : null
            }
            <form className='flex items-center p-2 font-semibold text-sm' onSubmit={handleSubmit}>
              <PlusIcon className='w-4 h-4 mr-[1.03rem] text-blue-600'/>
              <input required value={stepTitle} onChange={handleStepInput} placeholder='Add Step' className='placeholder-opacity-100 w-[100%] focus:outline-none placeholder-blue-600'/>
            </form>
          </div>
        </div>
        <div className='cursor-not-allowed flex items-center border mx-2 p-2 bg-white text-sm opacity-80'>
          <SunIcon className='w-4 h-4 mr-[1.03rem]'/>
          <p>Add to My Day</p>
        </div>
        <div className=' cursor-not-allowed flex flex-col p-2 space-y-3 bg-white text-sm opacity-80 mx-2 border'>
          <div className='flex items-center'>
            <ClockIcon className='w-4 h-4 mr-[1.03rem]'/>
            <p>Reminder</p>
          </div>
          <hr />
          <div className='flex items-center'>
            <CalendarIcon className='w-4 h-4 mr-[1.03rem]'/>
            <p>Add to calendar</p>
          </div>
          <hr />
          <div className='flex items-center'>
            <ClipboardCheckIcon className='w-4 h-4 mr-[1.03rem]'/>
            <p>Repeat</p>
          </div>
        </div>
        <div className='cursor-not-allowed flex items-center border mx-2 p-2 bg-white text-sm opacity-80'>
          <UserAddIcon className='w-4 h-4 mr-[1.03rem]'/>
          <p>Assign to</p>
        </div>
        <div className='cursor-not-allowed flex items-center border mx-2 p-2 bg-white text-sm opacity-80'>
          <PaperClipIcon className='w-4 h-4 mr-[1.03rem]'/>
          <p>Attach</p>
        </div>
        <textarea disabled className='cursor-not-allowed border mx-2 p-2 text-sm flex-1' placeholder='Add note'/>
        <div className='flex border-t text-sm opacity-80 items-center mx-3'>
          <p className='py-3 flex-1'>Created Monday., oct 25th 2021</p>
          <TrashIcon onClick={() => handleDeleteTask(selectedTask)} className='w-4 h-4'/>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;