import axios from 'axios'

export const LIST_URL = "http://127.0.0.1:8000/api/v1/list/"
export const TASK_URL = "http://127.0.0.1:8000/api/v1/task/"
export const TASK_URL_DETAIL = "http://127.0.0.1:8000/api/v1/task/?list="

export const getListApi = async () => {
    const listItems = await (await axios.get(LIST_URL)).data
    return listItems
}

export const getTaskApi = async () => {
    const taskItems = await (await axios.get(TASK_URL)).data
    return taskItems
}

export const createTaskApi = async (data) => {
    const taskItems = await (await axios.post(TASK_URL, data)).data
    return taskItems
}

export const getTaskDetailApi = async (id) => {
    const taskDetailItem = await (await axios.get(TASK_URL_DETAIL + id)).data
    return taskDetailItem
}