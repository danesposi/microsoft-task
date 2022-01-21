import { v4 as uuid } from "uuid"
const CREATE_STEP = "CREATE_STEP"
const FILTER_STEP = "FILTER_STEP"

const initialState = {
    steps: []
}

export const createStep = (data) => {
    return {
        type: CREATE_STEP,
        payload: {...data, id:uuid()}
    }
}

export const filterStep = (taskId) => {
    return {
        type: FILTER_STEP,
        payload: taskId
    }
}

export const stepReducer = (state=initialState, action) => {
    switch(action.type) {
        case CREATE_STEP:
            return {
                steps: [...state.steps, action.payload]
            }
        
        default:
            return state
    }
} 