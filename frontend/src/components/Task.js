import React from 'react';
import {
    PlusCircleIcon,
    CheckIcon,
    StarIcon
} from '@heroicons/react/outline'
import { selectTask } from '../store';
import { useDispatch } from 'react-redux';
import { completeTaskApi } from '../services/api';
import { useSelector } from 'react-redux';

const Task = ({props, setTaskState}) => {

  const taskId = useSelector(store => store?.taskListReducer?.selectedTask?.id)
  const toggleState = useSelector(store => store?.taskListReducer?.toggle)

  const dispatch = useDispatch()

  const handleClick = (task) => {
    if (task.id === taskId) {
      dispatch(selectTask(task, !toggleState))
    }
    else {
      dispatch(selectTask(task, true))
    }
  }

  const filterDone = (tasks, doneTask) => {
    let newTasks = tasks.map(
      task => task.id === doneTask.id
      ? doneTask
      : task
    )
    return newTasks
  }

  const completeTask = async (id, done) => {
    const data = {
      done: done
    }
    const taskItem = await completeTaskApi(id, data)
    dispatch(selectTask(taskItem, toggleState))
    setTaskState(tasks => filterDone(tasks, taskItem))
  }

  return (
    <div className='relative bg-slate-200 hover:bg-slate-100 rounded-md'>
      <div onClick={() => handleClick(props)} className=' rounded-md'>
          <div className='flex items-center mx-5'>
              <p className={
                props.done
                ? "pt-4 pb-4 ml-7 flex-1 line-through"
                : "pt-4 pb-4 ml-7 flex-1"
              }>{props.title}</p>
              <StarIcon className='text-zinc-500 h-5 w-5'/>
          </div>
      </div>
      {
        props.done
        ? <CheckIcon onClick={() => completeTask(props.id, false)} className='absolute inset-y-4 left-4 h-6 w-6 text-black cursor-pointer'/>
        : <PlusCircleIcon onClick={() => completeTask(props.id, true)} className='absolute inset-y-4 left-4 h-6 w-6 text-black cursor-pointer'/>
        }
    </div>
  )
};

export default Task;
