import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getStepByTaskApi, createStepApi, modifyTaskTitleApi } from '../services/api';
import { closeSidebar, selectTask } from '../store';
import { deleteTaskApi } from '../services/api';
import Step from './Step';
import {
  XIcon,
  PlusIcon,
  SunIcon,
  ClockIcon,
  CalendarIcon,
  ClipboardCheckIcon,
  UserAddIcon,
  PaperClipIcon,
  TrashIcon,
  CheckCircleIcon,
  CheckIcon
} from '@heroicons/react/outline';

const Sidebar = () => {

  const dispatch = useDispatch()
  const globalState = useSelector(state => state)
  const toggle = globalState?.toggle

  // STEP FUNCTIONS, STATE & HANDLERS

  const [stepState, setStepState] = useState(null)
  const [stepTitle, setStepTitle] = useState("")


  const getStepByTask = async (id) => {
    const step = await getStepByTaskApi(id)
    setStepState(step)
  }

  const createStep = async (data) => {
    const stepItem = await createStepApi(data)
    setStepState(step => [...step, stepItem])
  } 
  
  const handleSubmitStep = async (evt) => {
    evt.preventDefault()
    const data = {
      title: stepTitle,
      task: selectedTaskid,
      done: false
    }
    createStep(data)
    setStepTitle("")
  }

  // TASK FUNCTIONS, STATE & HANDLERS

  const selectedTask = globalState?.selectedTask
  const selectedTaskid = selectedTask?.id
  const selectedTaskTitle = selectedTask?.title

  const [taskTitle, setTaskTitle] = useState(selectedTaskTitle)
  
    const deleteTask = async (id) => {
      await deleteTaskApi(id)
      dispatch(closeSidebar())
    }
  
  const modifyTaskTitle = async (id, data) => {
    let taskItem = await modifyTaskTitleApi(id, data)
    dispatch(selectTask(taskItem, true))
  }
  
  const handleSubmitTaskTitle = () => {
    let data = {
      title: taskTitle
    }
    modifyTaskTitle(selectedTaskid, data)
  }

  // OTHERS...

  const onClickClose = () => {
    dispatch(closeSidebar())
  }

  useEffect(() => {
    getStepByTask(selectedTaskid)
    setTaskTitle(selectedTaskTitle)
  }, [selectedTask])

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
            {
              selectedTask?.done
              ? <CheckIcon className='w-5 h-5 mr-3'/>
              : <CheckCircleIcon className='w-5 h-5 mr-3'/>
            }
            <div className='active:scale-[0.99] transition-all ease-out duration-100'>
              {
                selectedTask?.done
                ? <input value={taskTitle} onChange={(evt) => setTaskTitle(evt.target.value)} onBlur={handleSubmitTaskTitle} className=' cursor-default line-through text-lg font-semibold flex-1'></input>
                : <input value={taskTitle} onChange={(evt) => setTaskTitle(evt.target.value)} onBlur={handleSubmitTaskTitle} className=' cursor-default text-lg font-semibold flex-1'></input>
              }
            </div>
          </div>
          <div className='max-h-96 overflow-auto'>
            {
              stepState
              ? stepState.map(step => <Step key={step.id} props={step} setStepState={setStepState}/>)
              : null
            }
            <form className='flex items-center p-2 font-semibold text-sm' onSubmit={handleSubmitStep}>
              <PlusIcon className='w-4 h-4 mr-[1.03rem] text-blue-600'/>
              <input required value={stepTitle} onChange={(evt) => setStepTitle(evt.target.value)} placeholder='Add Step' className='placeholder-opacity-100 w-[100%] focus:outline-none placeholder-blue-600'/>
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
          <form onSubmit={() => deleteTask(selectedTaskid)}>
            <button type='submit'><TrashIcon className='w-4 h-4 cursor-pointer'/></button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;