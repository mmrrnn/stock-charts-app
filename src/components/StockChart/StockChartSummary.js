import React, { useEffect, useMemo, useCallback, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Chart } from 'react-charts';

import { toggleSubscribeStock } from '../../data/actions/userActions';

const getStockSymbol = stockData => {
    const metaDataKey = Object.keys(stockData)[0];
    const symbolKey = Object.keys(stockData[metaDataKey])[1];
    const stockSymbol = Object.entries(stockData).length > 0 && !('Note' in stockData) 
        ? stockData[metaDataKey][symbolKey] : null;

    return stockSymbol;
};

const getChartData = stockData => {
    const timeSeriesKey = Object.keys(stockData)[1]; 
    const timeSeriesData = Object.entries(stockData[timeSeriesKey]);
    const closeKey = Object.keys(timeSeriesData[0][1])[3];
    const chartData = timeSeriesData
        .reverse()
        .splice(50, 50)
        .map(el => [el[0], el[1][closeKey]]);

    return chartData;
}

function StockChartSummary({ user, stockData, toggleSubscribeStock }) {    
    const stockSymbol = useMemo(
        () => getStockSymbol(stockData),
        [stockData]
    );
    const chartData = useMemo(
        () => getChartData(stockData),
        [stockData]
    );
    const subscribeCheckbox = createRef();

    useEffect(() => {
        if(user.authorized){
            subscribeCheckbox.current.checked = user.subscribedStock === stockSymbol;
        } 
    }, [user.subscribedStock, stockSymbol, subscribeCheckbox, user.authorized])
    
    const data = useMemo(
        () => [
            {
                label: stockSymbol,
                data: chartData
            }
        ],
        [chartData, stockSymbol]
    )

    const axes = useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left' },
        ],
        []
    )

    const handleClick = useCallback(
        e => {
            const stockSymbolToSubscribe = e.target.checked
                ? stockSymbol : null;

            toggleSubscribeStock({
                username: user.username,
                stockSymbol: stockSymbolToSubscribe
            })
        },
        [user, stockSymbol, toggleSubscribeStock]
    )

    return (
        <div
            style={{
                width: '100%',
                height: '300px',
            }}
        >
            {user.authorized ? <div className="form-check text-right mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="subscribeStockChart"
                    onClick={handleClick}
                    ref={subscribeCheckbox}
                />
                <label className="form-check-label" htmlFor="subscribeStockChart">Subscribe</label>
            </div> : null}

            <Chart 
                data={data}
                axes={axes}
                tooltip
            />
        </div>
    )
}

StockChartSummary.propTypes = {
    user: PropTypes.object.isRequired,
    stockData : PropTypes.object.isRequired,
    toggleSubscribeStock: PropTypes.func.isRequired    
}

export default connect(
    state => {
        return {
            user: state.user
        }
    },
    { toggleSubscribeStock }
)(StockChartSummary);