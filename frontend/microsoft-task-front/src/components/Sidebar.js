import React from 'react';
import Step from './Step';
import { ReactSortable } from 'react-sortablejs'
import rearrange from '../services/rearrange';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidebar, selectTask } from '../store';
import { getStepByTaskApi, createStepApi, modifyTaskFieldApi, deleteTaskApi } from '../services/api';
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

  // STEP FUNCTIONS, STATE & HANDLERS

  const [stepState, setStepState] = useState([])
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
    if (stepState.length < 12 ) {
      const data = {
        title: stepTitle,
        task: selectedTaskId,
        done: false
      }
      createStep(data)
      setStepTitle("")
    }
  }

  // TASK FUNCTIONS, STATE & HANDLERS

  const selectedTask = globalState?.selectedTask
  const selectedTaskId = selectedTask?.id
  const selectedTaskTitle = selectedTask?.title
  const selectedTaskNote = selectedTask?.note

  const [taskTitle, setTaskTitle] = useState(selectedTaskTitle)
  const [taskNote, setTaskNote] = useState(selectedTaskNote)
  
    const deleteTask = async (id) => {
      await deleteTaskApi(id)
      dispatch(closeSidebar())
    }
  
  const modifyTaskField = async (id, data) => {
    let taskItem = await modifyTaskFieldApi(id, data)
    dispatch(selectTask(taskItem, true))
  }
  
  const handleSubmitTaskTitle = () => {
    let data = {
      title: taskTitle
    }
    modifyTaskField(selectedTaskId, data)
  }

  const handleSubmitTaskNote = () => {
    let data = {
      note: taskNote
    }
    modifyTaskField(selectedTaskId, data)
  }

  // OTHERS...

  const onClickClose = () => {
    dispatch(closeSidebar())
  }

  useEffect(() => {
    getStepByTask(selectedTaskId)
    setTaskTitle(selectedTaskTitle)
    setTaskNote(selectedTaskNote)
  }, [selectedTaskId])

  return (
    <div className={'flex h-[100%] flex-col justify-between overflow-auto'}>
      <div className='flex space-y-3 flex-col right-0'>
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
            <input value={taskTitle} onChange={(evt) => setTaskTitle(evt.target.value)} onBlur={handleSubmitTaskTitle} className={`cursor-default text-xl font-semibold flex-1 ${selectedTask?.done ? 'line-through' : null}`}></input>
            </div>
          </div>
          <div className='max-h-96 overflow-auto mt-2'>
            <ReactSortable className='mx-2 space-y-4' list={stepState} setList={setStepState} ghostClass='blue-background-class' animation={300} onEnd={() => rearrange(stepState, 'step')}>
              {
                stepState
                ? stepState.map(step => <Step key={step.id} props={step} setStepState={setStepState}/>)
                : null
              }
            </ReactSortable>
            <form className='flex items-center mx-3 my-4 font-semibold text-sm ' onSubmit={handleSubmitStep}>
              <PlusIcon className='w-4 h-4 mr-[1.03rem] text-blue-600'/>
              <input required value={stepTitle} onChange={(evt) => setStepTitle(evt.target.value)} placeholder='Add Step' className='text-base placeholder-opacity-100 w-[100%] focus:outline-none placeholder-blue-600'/>
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
            <p className='text-base'>Reminder</p>
          </div>
          <hr />
          <div className='flex items-center'>
            <CalendarIcon className='w-4 h-4 mr-[1.03rem]'/>
            <p className='text-base'>Add to calendar</p>
          </div>
          <hr />
          <div className='flex items-center'>
            <ClipboardCheckIcon className='w-4 h-4 mr-[1.03rem]'/>
            <p className='text-base'>Repeat</p>
          </div>
        </div>
        <div className='cursor-not-allowed flex items-center border mx-2 p-2 bg-white text-sm opacity-80'>
          <UserAddIcon className='w-4 h-4 mr-[1.03rem]'/>
          <p className='text-base'>Assign to</p>
        </div>
        <div className='cursor-not-allowed flex items-center border mx-2 p-2 bg-white text-sm opacity-80'>
          <PaperClipIcon className='w-4 h-4 mr-[1.03rem]'/>
          <p className='text-base'>Attach</p>
        </div>
        <textarea maxLength={200} value={taskNote} onChange={(evt) => setTaskNote(evt.target.value)} onBlur={handleSubmitTaskNote} className='focus:outline-none focus:border-1 focus:ring-transparent border mx-2 p-2 text-base' placeholder='Add note'/>
      </div>
        <div className='flex border-t text-sm opacity-80 items-center mx-3'>
          <p className='py-3 flex-1'>Created Monday., oct 25th 2021</p>
          <form onSubmit={() => deleteTask(selectedTaskId)}>
            <button type='submit'><TrashIcon className='w-4 h-4 cursor-pointer'/></button>
          </form>
        </div>
    </div>
  )
};

export default Sidebar;
