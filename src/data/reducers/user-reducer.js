import {
    LOADING,
    LOADED,
    FAILED,
    USER_ADD_REQUEST,
    USER_ADD_SUCCESS,
    USER_ADD_FAILURE,
    
} from '../constants';

const initialState = {
    authorized: null,
    user: {},
    llStockCharts: {},
    loadingState: null,
    error: null
}

export default function user(state = initialState, action){
    const newLoadingState = { ...state.loadingState };
    
    switch(action.type){
        case USER_ADD_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING
                }
            };
        case USER_ADD_SUCCESS:
            delete newLoadingState.USER_ADD_REQUEST;

            return {
                ...state,
                authorized: true,
                user: action.payload,
                loadingState: newLoadingState
            };
        case USER_ADD_FAILURE:
            delete newLoadingState.USER_ADD_REQUEST;

            return {
                ...state,
                user: {},
                error: action.payload,
                authorized: false,
                loadingState: newLoadingState
            }
        default:
            return state;
    }
}
