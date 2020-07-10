import {
    LOADING,
    USER_ADD_REQUEST,
    USER_ADD_SUCCESS,
    USER_ADD_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT,
    TOGGLE_SUBSCRIBE_STOCK_REQUEST,
    TOGGLE_SUBSCRIBE_STOCK_SUCCESS,
    TOGGLE_SUBSCRIBE_STOCK_FAILURE

} from '../constants';

const initialState = {
    authorized: null,
    username: undefined,
    subscribedStock: undefined,
    loadingState: null,
    error: null
}

export default function user(state = initialState, action) {
    const newLoadingState = { ...state.loadingState };

    // USER_ADD
    switch (action.type) {
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
                username: action.payload.username,
                subscribedStock: action.payload.subscribedStock,
                error: null,
                loadingState: newLoadingState
            };
        case USER_ADD_FAILURE:
            delete newLoadingState.USER_ADD_REQUEST;

            return {
                ...state,
                username: null,
                subscribedStock: null,
                error: action.payload,
                authorized: false,
                loadingState: newLoadingState
            }

        // SIGN IN 
        case SIGN_IN_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING
                }
            };
        case SIGN_IN_SUCCESS:
            delete newLoadingState.SIGN_IN_REQUEST;

            return {
                ...state,
                authorized: true,
                username: action.payload.username,
                subscribedStock: action.payload.subscribedStock,
                error: null,
                loadingState: newLoadingState
            };
        case SIGN_IN_FAILURE:
            delete newLoadingState.SIGN_IN_REQUEST;

            return {
                ...state,
                username: null,
                subscribedStock: null,
                error: action.payload,
                authorized: false,
                loadingState: newLoadingState
            }

        // SIGN OUT
        case SIGN_OUT:
            return {
                ...state,
                authorized: false,
                username: null,
                subscribedStock: null,
            };

        // TOGGLE SUBSCRIBE
        case TOGGLE_SUBSCRIBE_STOCK_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING
                }
            };
        case TOGGLE_SUBSCRIBE_STOCK_SUCCESS:
            delete newLoadingState.TOGGLE_SUBSCRIBE_STOCK_REQUEST;

            return {
                ...state,
                subscribedStock: action.payload.subscribedStock,
                error: null,
                loadingState: newLoadingState
            };
        case TOGGLE_SUBSCRIBE_STOCK_FAILURE:
            delete newLoadingState.TOGGLE_SUBSCRIBE_STOCK_REQUEST;

            return {
                ...state,
                subscribedStock: null,
                error: action.payload,
                loadingState: newLoadingState
            }
        default:
            return state;
    }
}
