import {
    LOADING,
    STOCK_DATA_GET_REQUEST,
    STOCK_DATA_GET_SUCCESS,
    STOCK_DATA_GET_FAILURE
} from '../constants';

const initialState = {
    currentStockData: {}
}

export default function stockData(state = initialState, action) {
    const newLoadingState = { ...state.loadingState };

    switch (action.type) {
        case STOCK_DATA_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING
                }
            };
        case STOCK_DATA_GET_SUCCESS:
            delete newLoadingState.STOCK_DATA_GET_REQUEST;

            return {
                ...state,
                currentStockData: action.payload,
                error: null,
                loadingState: newLoadingState
            };
        case STOCK_DATA_GET_FAILURE:
            delete newLoadingState.STOCK_DATA_GET_REQUEST;

            return {
                ...state,
                currentStockData: action.payload,
                error: action.payload,
                loadingState: newLoadingState
            }
        default:
            return state;
    }
}
