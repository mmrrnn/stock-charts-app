import PropTypes from 'prop-types';
import {
    STOCK_DATA_GET
} from '../constants';

export const getStockData = ({ selectedStock, timeInterval }) => {
    const stockSymbol = selectedStock ? selectedStock : 'GOOGL';
    const timeSeries = timeInterval && timeInterval !== 'DAILY' ? 'INTRADAY' : 'DAILY';
    const interval = timeInterval !== 'DAILY' ? `&interval=${timeInterval}` : '';

    const promise = fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeries}&symbol=${stockSymbol}${interval}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    
    return {
        type: STOCK_DATA_GET,
        promise,
        failureMessage: `Stock data fetching error, check the console!`
    }
}

getStockData.propTypes = {
    selectedStock: PropTypes.string.isRequired,
    timeInterval: PropTypes.string.isRequired
}