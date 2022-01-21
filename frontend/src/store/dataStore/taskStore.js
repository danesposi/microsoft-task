import { v4 as uuid } from "uuid"

const CREATE_TASK = "CREATE_TASK"
const DELETE_TASK = "DELETE_TASK"
const UPDATE_TASK = "UPDATE_TASK"

const initialState = {
    tasks: []
}

export const createTask = (data) => {
    return {
        type: CREATE_TASK,
        payload: {...data, id:uuid()}
    }
}

export const deleteTask = (id) => {
    return {
        type: DELETE_TASK,
        payload: id
    }
}

export const updateTask = (taskId) => {
    return {
        type: UPDATE_TASK,
        payload: taskId
    }
}

export const taskReducer = (state=initialState, action) => {
    switch(action.type) {
        case CREATE_TASK:
            return {
                tasks:[...state.tasks, action.payload]
            }
        
        case UPDATE_TASK:
            let objIndex = state.tasks.findIndex(obj => obj.id === action.payload.id)
            let newState = state.tasks
            newState[objIndex] = action.payload

            return {
                tasks:newState
            }
        
        case DELETE_TASK:
            return {
                tasks: state.tasks.filter(task => task!=action.payload)
            }
        
        default:
            return state
    }
}
