const loadPbiList = (data) => ({
    type: 'LOAD_PBI_LIST',
    data
})

const addPbi = (data) => ({
    type: 'ADD_PBI',
    data
})

const editPbi = (data) => ({
    type: 'EDIT_PBI',
    data
})
const deletePbi = (data) => ({
    type: 'DELETE_PBI',
    data
})
const changePbiStatu = (data) => ({
    type: 'CHANGE_PBI_STATU',
    data
})


export default {
    loadPbiList,
    addPbi,
    editPbi,
    deletePbi,
    changePbiStatu,
}




