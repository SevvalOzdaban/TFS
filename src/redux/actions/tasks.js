const getTaskList = (data) => ({
    type: 'GET_TASK_LIST',
    data
})
const addTask = (data) => ({
    type: 'ADD_TASK',
    data
})

const editTask = (data) => ({
    type: 'EDIT_TASK',
    data
})
const deleteTask = (data) => ({
    type: 'DELETE_TASK',
    data
})


export default {
    getTaskList,
    addTask,
    editTask,
    deleteTask
}
