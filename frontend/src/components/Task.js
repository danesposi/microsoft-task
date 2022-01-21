import React from 'react';
import {
    PlusCircleIcon,
    StarIcon
} from '@heroicons/react/outline'

const Task = ({props}) => {
  return (
    <div className='bg-slate-200 rounded-md hover:bg-slate-100'>
        <div className='flex items-center mx-5'>
            <PlusCircleIcon className='h-6 w-6 mr-3'/>
            <p className='pt-4 pb-4 flex-1'>{props.title}</p>
            <StarIcon className='text-zinc-500 h-5 w-5'/>
        </div>
    </div>
  )
};

export default Task;
