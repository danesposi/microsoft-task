const REFRESH_LIST = "REFRESH_LIST"
const REFRESH_TASK = "REFRESH_TASK"
const REFRESH_STEP = "REFRESH_STEP"

export const refreshInitialState = {
    refreshList: false,
    refreshTask: false,
    refreshStep: false
}

export const refreshList = () => {
    return {
        type: REFRESH_LIST
    }
}

export const refreshTask = () => {
    return {
        type: REFRESH_TASK
    }
}

export const refreshStep = () => {
    return {
        type: REFRESH_STEP
    }
}

export const refreshReducer = (state=refreshInitialState, action) => {
    switch(action.type) {
        case REFRESH_LIST:
            return {
                ...state,
                refreshList: !state.refreshList
            }
        
        case REFRESH_TASK:
            return {
                ...state,
                refreshTask: !state.refreshTask
            }
        
        case REFRESH_STEP:
            return {
                ...state,
                refreshStep: !state.refreshStep
            }
        
        default:
            return state
    }
}

