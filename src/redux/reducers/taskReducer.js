const taskReducerDefaultState = {
    tasks: []
};

const taskReducer = (state = taskReducerDefaultState, action) => {
    const index = state.tasks.findIndex(item => item.id === action.data.id);
    const lastIndex = state.tasks.length;
    let newState = [...state.tasks];

    switch (action.type) {
        case 'GET_TASK_LIST':
            return {
                ...state, //copying the orignal state
                tasks: action.data, //reassingning todos to new array
            }
        case 'ADD_TASK':
            newState[lastIndex] = {
                ...state.tasks[lastIndex],
                id: action.data.taskId,
                sprintId: action.data.sprintId,
                name: action.data.name,
                desc: action.data.desc,
                effort: action.data.effort,
                user: action.data.user
            }
            return {
                ...state,
                tasks: newState,
            }
        case 'EDIT_TASK':
            newState[index] = {
                ...state.tasks[index],
                name: action.data.name,
                desc: action.data.desc,
                effort: action.data.effort,
                sprintId: action.data.sprintId,
                user: action.data.user
            }
            return {
                ...state,
                tasks: newState,
            }
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id !== action.data.id),
            }
        default:
            return state;
    }
};
export default taskReducer;