import axios from 'axios'

const rearrange = async (itemsList, resource) => {
    let url = `http://127.0.0.1:8000/api/v1/${resource}/rearrange/`
    let newList = [...itemsList]
    for (let i = 0; i < itemsList.length; i++) {
        newList[i].order = i
    }
    await axios.post(url, newList)
}

export default rearrange
