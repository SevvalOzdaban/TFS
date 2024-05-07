const userReducerDefaultState = {
    pbis: []
};

const pbiReducer = (state = userReducerDefaultState, action) => {
    const index = state.pbis.findIndex(item => item.id === action.data.id);
    const lastIndex = state.pbis.length;
    let newState = [...state.pbis];
    switch (action.type) {
        case 'LOAD_PBI_LIST':
            return {
                ...state,
                pbis: action.data,
            }
        case 'ADD_PBI':
            newState[lastIndex] = {
                ...state.pbis[lastIndex],
                id: lastIndex,
                name: action.data.name,
                desc: action.data.desc,
                assignedUserId: 1,
                effort: action.data.effort,
                editable: false,
                sprintId: action.data.sprintId,
                statu: 2
            }
            return {
                ...state,
                pbis: newState,
            }
        case 'EDIT_PBI':
            newState[index] = {
                ...state.pbis[index],
                name: action.data.name,
                desc: action.data.desc,
                effort: action.data.effort
            }
            return {
                ...state,
                pbis: newState,
            }
        case 'DELETE_PBI':
            return {
                ...state,
                pbis: state.pbis.filter(item => item.id !== action.data),
            }
        case 'CHANGE_PBI_STATU':
            newState[index] = { ...state.pbis[index], statu: action.data.statu }
            return {
                ...state,
                pbis: newState,
            }

        default:
            return state;
    }
};
export default pbiReducer;
