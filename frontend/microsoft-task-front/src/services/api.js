import axios from 'axios'

const LIST_URL = "https://microsoft-task-api.herokuapp.com/api/v1/list/"
const TASK_URL = "https://microsoft-task-api.herokuapp.com/api/v1/task/"
const STEP_URL = "https://microsoft-task-api.herokuapp.com/api/v1/step/"
const TASK_BY_LIST_URL = "https://microsoft-task-api.herokuapp.com/api/v1/task/?list="
const STEP_BY_TASK_URL = "https://microsoft-task-api.herokuapp.com/api/v1/step/?task="


export const getListApi = async () => {
    const listItems = await (await axios.get(LIST_URL)).data
    return listItems
}

export const createListApi = async (data) => {
    const taskItems = await (await axios.post(LIST_URL, data)).data
    return taskItems
}

export const deleteListApi = async (id) => {
    const status = await axios.delete(LIST_URL + id + '/').status
    return status
}

export const modifyListTitleApi = async (id, data) => {
    const listItem = await (await axios.patch(LIST_URL + id + '/', data)).data
    return listItem 
}

export const getTaskApi = async () => {
    const taskItems = await (await axios.get(TASK_URL)).data
    return taskItems
}

export const createTaskApi = async (data) => {
    const taskItems = await (await axios.post(TASK_URL, data)).data
    return taskItems
}

export const getTaskByListApi = async (id) => {
    const taskDetailItem = await (await axios.get(TASK_BY_LIST_URL + id)).data
    return taskDetailItem
}

export const modifyTaskFieldApi = async (id, data) => {
    const taskItem = await (await axios.patch(TASK_URL + id + '/', data)).data
    return taskItem
}

export const deleteTaskApi = async (id) => {
    const status = await axios.delete(TASK_URL + id + '/').status
    return status
}

export const completeTaskApi = async (id, data) => {
    const status = await (await axios.patch(TASK_URL + id + '/', data)).data
    return status
}

export const getStepByTaskApi = async (id) => {
    const status = await( await axios.get(STEP_BY_TASK_URL + id)).data
    return status
}

export const createStepApi = async (data) => {
    const stepItem = await (await axios.post(STEP_URL, data)).data
    return stepItem
}

export const modifyStepTitleApi = async (id, data) => {
    const stepItem = await (await axios.patch(STEP_URL + id + '/', data)).data
    return stepItem
}

export const completeStepApi = async (id, data) => {
    const status = await (await axios.patch(STEP_URL + id + '/', data)).data
    return status
}

export const deleteStepApi = async (id) => {
    const status = await axios.delete(STEP_URL + id + '/').status
    return status
}
