import {React, useState} from 'react';
import { deleteStepApi, completeStepApi, modifyStepTitleApi } from '../services/api';
import {
    CheckIcon,
    PlusCircleIcon,
    XIcon
  } from '@heroicons/react/outline';

const Step = ({props, setStepState}) => {

  const [stepTitle, setStepTitle] = useState(props.title)

  const handleStepTitleSubmit = () => {
    let data = {
      title:stepTitle
    }
    modifyStepTitleApi(props.id, data)
  }

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
    await deleteStepApi(id)
    setStepState(steps => steps.filter(step => step.id !== id))
  }

  return (
    <div className='flex items-center text-sm'>
        {
          props.done
          ? <CheckIcon className='h-5 w-5 cursor-pointer mr-4' onClick={() => completeStep(props.id, false)} />
          : <PlusCircleIcon className='h-5 w-5 cursor-pointer mr-4' onClick={() => completeStep(props.id, true)} />
        }
        <div className='flex flex-1 active:scale-[0.99] transition-all ease-out duration-100'>
          {
            props.done
            ? <input className='border-b text-base flex-1 line-through cursor-default' value={stepTitle} onChange={(evt) => setStepTitle(evt.target.value)} onBlur={() => handleStepTitleSubmit()}></input>
            : <input className='border-b text-base flex-1 cursor-default' value={stepTitle} onChange={(evt) => setStepTitle(evt.target.value)} onBlur={() => handleStepTitleSubmit()}></input>
          }
        </div>
        <XIcon onClick={() => deleteStep(props.id)} className='cursor-pointer h-4 w-4'/>
    </div>
  ) 
};

export default Step;
