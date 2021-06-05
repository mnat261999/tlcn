import ACTIONS from "../actions";

const initState={
    loading: false,
    createError:[],
}

const postReducer =(state =initState, action) =>{
    const {type, payload} = action;
    if (type === ACTIONS.SET_LOADER) {
        return {...state, loading: true}
    } else if (type === ACTIONS.CLOSE_LOADER) {
        return {...state, loading: false} 
    } else if (type === ACTIONS.CREATE_ERRORS) {
        return {...state, createErrors: payload}
    } else {
        return state; 
    }

}

export default postReducer