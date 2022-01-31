import axios from 'axios'

const rearrange = async (itemsList, resource) => {
    let url = `https://microsoft-task-api.herokuapp.com/api/v1/${resource}/rearrange/`
    let newList = [...itemsList]
    for (let i = 0; i < itemsList.length; i++) {
        newList[i].order = i
    }
    await axios.post(url, newList)
}

export default rearrange
