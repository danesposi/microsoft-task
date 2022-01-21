const SELECT_LIST = "SELECT_LIST"
const SELECT_TASK = "SELECT_TASK"

const initialState = {
    selectedList: null,
    selectedTask: null
};

export const selectList = (id) => {
    return {
        type: SELECT_LIST,
        payload: id
    }
}

export const selectTask = (id) => {
    return {
        type: SELECT_TASK,
        payload: id
    }
}

export const taskListReducer = (state=initialState, action) => {
    switch(action.type) {
        case SELECT_LIST:
            return {
                selectedList: action.payload,
                selectedTask: null
            }
        
        case SELECT_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        
        default:
            return state
    }
}
