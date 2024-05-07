
const getSprintList = (data) => ({
    type: 'GET_SPRINT_LIST',
    data
})
const addSprint = (data) => ({
    type: 'ADD_SPRINT',
    data
})
const setSelectedSpring = (data) => ({
    type: 'SET_SELECTED_SPRINT',
    data
})

export default {
    getSprintList,
    addSprint,
    setSelectedSpring
}




