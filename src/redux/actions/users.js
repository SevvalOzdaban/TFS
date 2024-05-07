
const getUserList = (data) => ({
    type: 'GET_USER_LIST',
    data
})
const addUser = (data) => ({
    type: 'ADD_USER',
    data
})
const updateUserRemainingHour= (data) => ({
    type: 'UPDATE_USER_REMAINING_HOUR',
    data
})
export default {
    getUserList,
    addUser,
    updateUserRemainingHour
}




