const SELECT_LIST = "SELECT_LIST"
const SELECT_TASK = "SELECT_TASK"
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR"
const TOGGLE_MENU_SIDEBAR = "TOGGLE_MENU_SIDEBAR"

export const taskListInitialState = {
    selectedList: null,
    selectedTask: null,
    toggle: false,
    toggleMenu: false
};


export const selectList = (list) => {
    return {
        type: SELECT_LIST,
        payload: list
    }
}

export const selectTask = (task, toggle) => {
    return {
        type: SELECT_TASK,
        payload: task,
        toggle: toggle
    }
}

export const closeSidebar = () => {
    return {
        type: CLOSE_SIDEBAR
    }
}

export const toggleMenuSidebar = (toggleMenu) => {
    return {
        type: TOGGLE_MENU_SIDEBAR,
        toggleMenu: toggleMenu
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
            return {
                ...state,
                selectedTask: action.payload,
                toggle: action.toggle
            }
        
        case CLOSE_SIDEBAR:
            return {
                ...state,
                toggle: false
            }

        case TOGGLE_MENU_SIDEBAR:
            return {
                ...state,
                toggleMenu: action.toggleMenu
            }
        
        default:
            return state
    }
}
