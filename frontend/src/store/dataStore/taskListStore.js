const SELECT_LIST = "SELECT_LIST"
const SELECT_TASK = "SELECT_TASK"
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR"

export const taskListInitialState = {
    selectedList: null,
    selectedTask: null,
    toggle: false,
};


export const selectList = (list) => {
    return {
        type: SELECT_LIST,
        payload: list
    }
}

export const selectTask = (task) => {
    return {
        type: SELECT_TASK,
        payload: task
    }
}

export const closeSidebar = () => {
    return {
        type: CLOSE_SIDEBAR
    }
}


export const taskListReducer = (state=taskListInitialState, action) => {
    switch(action.type) {

        case SELECT_LIST:
            return {
                ...state,
                selectedList: action.payload,
                toggle: false
            }
        
        case SELECT_TASK:
            let toggle
            if (!state.selectedTask) {
                toggle = true
            }
            else if (state.selectedTask.id !== action.payload.id) {
                toggle = true
            }
            else {
                action.payload = null
                toggle = false
            }
    
            return {
                ...state,
                selectedTask: action.payload,
                toggle: toggle
            }
        
        case CLOSE_SIDEBAR:
            return {
                ...state,
                selectedTask: null,
                toggle: false
            }
        
        default:
            return state
    }
}
