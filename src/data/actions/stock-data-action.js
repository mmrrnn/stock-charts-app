import {
    STOCK_DATA_GET
} from '../constants';

export const getStockData = selectedStock => {
    const promise = fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedStock}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    
    return {
        type: STOCK_DATA_GET,
        promise,
        failureMessage: `Stock data fetching error, check the console!`
    }
}