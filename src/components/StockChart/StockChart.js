import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import StockChartSummary from './StockChartSummary';
import { getStockData } from '../../data/actions/stock-data-action';

function StockChart({ subscribedStock, authorized, getStockData, stockData }) {   
    const [isCorrect, setIsCorrect] = useState(Object.entries(stockData).length);
    
    useEffect(() => {
        if(subscribedStock === null){
            setIsCorrect(false);
        } else if(stockData['Meta Data']['2. Symbol'] !== subscribedStock){
            getStockData({ selectedStock: subscribedStock, timeInterval: "DAILY" })
        }
    }, [subscribedStock, stockData, getStockData])
    
    if (authorized !== true) {
        return <Redirect to="/" />;
    };

    const handleClick = e => {
        const timeInterval = e.target.name;

        if(subscribedStock){
            getStockData({ selectedStock: subscribedStock, timeInterval })
        }
    }

    return (
        <div className="container">
            <h2 className="text-center text-primary">Subscribed Stock Chart</h2>
            
            {isCorrect ? <StockChartSummary stockData={stockData}/> : null}

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