const SELECT_LIST = "SELECT_LIST"
const SELECT_TASK = "SELECT_TASK"
const REFRESH_ON_REQUEST = "REFRESH_ON_REQUEST"
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR"

export const taskListInitialState = {
    selectedList: null,
    selectedTask: null,
    listTitle: null,
    taskTitle: null,
    toggle: false,
};


export const refreshOnRequest = (method) => {
    return {
        type: REFRESH_ON_REQUEST,
        method: method
    } 
}

export const selectList = (id, listTitle) => {
    return {
        type: SELECT_LIST,
        payload: id,
        listTitle: listTitle
    }
}

export const selectTask = (id, taskTitle) => {
    return {
        type: SELECT_TASK,
        payload: id,
        taskTitle: taskTitle
    }
}

export const closeSidebar = () => {
    return {
        type: CLOSE_SIDEBAR
    }
}


export const taskListReducer = (state=taskListInitialState, action) => {
    switch(action.type) {

        case REFRESH_ON_REQUEST:
            let newState
            
            if (action.method == "delete task") {
                newState = {
                    ...state,
                    refresh: !state.refresh,
                    toggle: false,
                    taskTitle: null,
                    selectedTask: null
                }
            }
            
            else {
                newState = {
                    ...state,
                    refresh: !state.refresh
                }
            }
            return newState

        case SELECT_LIST:
            return {
                ...state,
                selectedList: action.payload,
                selectedTask: null,
                taskTitle: null,
                listTitle: action.listTitle,
                toggle: false
            }
        
        case SELECT_TASK:
            let toggle
            if (state.selectedTask !== action.payload) {
                toggle = true
            }
            else {
                toggle = false
                action.payload = null
            }
    
            return {
                ...state,
                selectedTask: action.payload,
                taskTitle:action.taskTitle,
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
