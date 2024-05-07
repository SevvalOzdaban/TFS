const sprintReducerDefaultState = {
    sprints: [],
    selectedSpring: 0
};

const sprintReducer = (state = sprintReducerDefaultState, action) => {
    const lastIndex = state.sprints.length;
    let newState = [...state.sprints];
    switch (action.type) {
        case 'GET_SPRINT_LIST':
            return {
                ...state, //copying the orignal state
                sprints: action.data, //reassingning todos to new array
            }
        case 'ADD_SPRINT':
            newState[lastIndex] = {
                ...state.sprints[lastIndex],
                id: action.data.id,
                name: action.data.name,
                startDate: action.data.startDate,
                endDate: action.data.endDate
            }
            return {
                ...state,
                sprints: newState,
            }
            case 'SET_SELECTED_SPRINT':
                return {
                    ...state,
                    selectedSpring: action.data,
                }
        default:
            return state;
    }
};
export default sprintReducer;