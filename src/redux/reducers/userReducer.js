const userReducerDefaultState = {
    users: []
};

const userReducer = (state = userReducerDefaultState, action) => {
    const lastIndex = state.users.length;
    const index = state.users.findIndex(item => item.id === action.data.user);
    let newState = [...state.users];
    
    let findedRemainingHour = newState.find(item => item.id == action.data.user)?.remainingHour;
    switch (action.type) {
        case 'GET_USER_LIST':
            return {
                ...state, //copying the orignal state
                users: action.data, //reassingning todos to new array
            }
        case 'ADD_USER':
            newState[lastIndex] = {
                ...state.users[lastIndex],
                id: action.data.id,
                name: action.data.name,
                role: action.data.role,
                totalHour: action.data.totalHour
            }
            return {
                ...state,
                users: newState,
            }
        case 'UPDATE_USER_REMAINING_HOUR':
            if (findedRemainingHour - action.data.effort > 0) {
                newState[index] = { ...state.users[index], remainingHour: findedRemainingHour - action.data.effort }
                return {
                    ...state,
                    users: newState,
                }
            }
            else
                alert("There is not enough effort for this person")

        default:
            return state;
    }
};
export default userReducer;
