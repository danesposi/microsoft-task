import { act } from "react-dom/cjs/react-dom-test-utils.production.min"
import { v4 as uuid } from "uuid"

const CREATE_LIST = "CREATE_LIST"
const DELETE_LIST = "DELETE_LIST"
const SELECT_LIST = "SELECT_LIST"


const initialState = {
    lists: [
        {
            title: "Software",
            id:1
        }
    ],
    selected: 1
}

export const createList = (data) => {
    return {
        type: CREATE_LIST,
        payload: {...data, id:uuid()}
    }
}

export const selectList = (id) => {
    return {
        type: SELECT_LIST,
        payload: id
    }
}

export const deleteList = (id) => {
    return {
        type: DELETE_LIST,
        payload: id
    }
}

export const listReducer = (state=initialState, action) => {

    switch(action.type) {

        case CREATE_LIST:
            return {
                ...state,
                lists: [...state.lists, action.payload]
            }
        
        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(list => list!=action.payload)
            }
        
        case SELECT_LIST:
            return {
                ...state,
                selected:action.payload
            }
        
        default:
            return state
    }
}
