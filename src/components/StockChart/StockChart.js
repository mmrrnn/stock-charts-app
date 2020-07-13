import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import StockChartSummary from './StockChartSummary';
import { getStockData } from '../../data/actions/stockDataActions';

const OptionalStockSummary = ({ isDataCorrect, stockData }) => {
    if(isDataCorrect)return <StockChartSummary stockData={stockData}/>;
}

const hasWrongkData = ({ stockData, subscribedStock }) => {
    const entries = Object.entries(stockData);
    const condition = 'Note' in stockData || !entries.length
        ? true
        : subscribedStock && stockData['Meta Data']['2. Symbol'] !== subscribedStock;
    
    return condition;
}

function StockChart({ subscribedStock, authorized, stockData, getStockData }) {       
    const isDataCorrect = useMemo(
        () => !hasWrongkData({ stockData, subscribedStock }),
        [stockData, subscribedStock]
    );
    
    useEffect(() => {
        if(isDataCorrect === false){
            getStockData({ selectedStock: subscribedStock, timeInterval: "DAILY" });
        }
    }, [subscribedStock, getStockData, isDataCorrect]);

    const handleClick = useCallback(
        e => {
            const timeInterval = e.target.name;
    
            if(subscribedStock){
                getStockData({ selectedStock: subscribedStock, timeInterval })
            }
        },
        [getStockData, subscribedStock]
    )
    
    if (authorized !== true) return <Redirect to="/" />;

    return (
        <div className="container">
            <h2 className="text-center text-primary">Subscribed Stock Chart</h2>
            
            <OptionalStockSummary isDataCorrect={isDataCorrect} stockData={stockData} />

            <div className="row mt-6">
                <div className="col-12 d-flex justify-content-center">
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className="btn btn-primary">
                            <input type="radio" name="1min" onClick={handleClick} /> 1min
                        </label>
                        <label className="btn btn-primary">
                            <input type="radio" name="5min" onClick={handleClick} /> 5min
                        </label>
                        <label className="btn btn-primary">
                            <input type="radio" name="15min" onClick={handleClick} /> 15min
                        </label>
                        <label className="btn btn-primary">
                            <input type="radio" name="30min" onClick={handleClick} /> 30min
                        </label>
                        <label className="btn btn-primary">
                            <input type="radio" name="60min" onClick={handleClick} /> 60min
                        </label>
                        <label className="btn btn-primary active">
                            <input type="radio" name="DAILY" onClick={handleClick} /> Daily
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

StockChart.propTypes = {
    subscribedStock: PropTypes.string,
    authorized: PropTypes.bool.isRequired,
    stockData : PropTypes.object,
    getStockData: PropTypes.func.isRequired,
}

export default connect(
    state => {
        return {
            subscribedStock: state.user.subscribedStock,
            authorized: state.user.authorized,
            stockData: state.stockData.currentStockData
        }
    },
    { getStockData }
)(StockChart);