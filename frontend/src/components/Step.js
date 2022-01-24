import React from 'react';
import { useDispatch } from 'react-redux';
import { refreshStep } from '../store';
import { deleteStepApi, completeStepApi } from '../services/api';
import {
    CheckIcon,
    PlusCircleIcon,
    XIcon
  } from '@heroicons/react/outline';

const Step = ({props, setStepState}) => {

  const filterDone = (step, doneStep) => {
    let newSteps = step.map(
      task => task.id === doneStep.id
      ? doneStep
      : task
    )
    return newSteps
  }

  const completeStep = async (id, done) => {
    const data = {
      done: done
    }
    const stepItem = await completeStepApi(id, data)
    setStepState(step => filterDone(step, stepItem))
  }

  const deleteStep = async (id) => {
    const status = await deleteStepApi(id)
    setStepState(steps => steps.filter(step => step.id !== id))
  }

  return (
    <div className='flex items-center pl-2 pt-2 pb-2 pr-2 text-sm border-t'>
        {
          props.done
          ? <CheckIcon className='h-5 w-5 cursor-pointer mr-4' onClick={() => completeStep(props.id, false)} />
          : <PlusCircleIcon className='h-5 w-5 cursor-pointer mr-4' onClick={() => completeStep(props.id, true)} />
        }
        {
          props.done
          ? <p className='flex-1 line-through'>{props.title}</p>
          : <p className='flex-1'>{props.title}</p>
        }
        <XIcon onClick={() => deleteStep(props.id)} className='cursor-pointer h-4 w-4'/>
    </div>
  ) 
};

export default Step;
