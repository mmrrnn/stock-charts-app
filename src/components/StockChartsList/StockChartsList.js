import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import StockChartSummary from '../StockChart/StockChartSummary';
import { getStockData } from '../../data/actions/stock-data-action'

function StockChartsList({ stockData = {}, getStockData, authorized }) {
    const [selectedStock, setSelectedStock] = useState('GOOGL');
    
    useEffect(() => {
        if(
            Object.entries(stockData).length > 0 &&
            Object.keys(stockData).find(key => key === 'Note') !== 'Note'
        ){
            setSelectedStock(stockData['Meta Data']['2. Symbol'])
        }
    }, [authorized, stockData])

    const handleChange = useCallback(
        e => {
            setSelectedStock(e.target.value);
        },
        [setSelectedStock]
    );

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            getStockData({ selectedStock });
        },
        [getStockData, selectedStock]
    )

    return (
        <div className="container">
            <h2 className="text-center text-primary">Find Stock Chart</h2>

            <div className="row mt-4 d-flex justify-content-center mb-4">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="form-group">
                        <label htmlFor="stockNames">Select stock name</label>
                        <select className="form-control" id="stockNames" onChange={handleChange} value={selectedStock}>
                            <option value="GOOGL">Alphabet Inc Class A</option>
                            <option value="AMZN">Amazon.com Inc.</option>
                            <option value="AAPL">Apple Inc.</option>
                            <option value="INTC">Intel Corporation</option>
                            <option value="IBM">International Business Machines Corporation</option>
                            <option value="MSFT">Microsoft Corporation</option>
                            <option value="NFLX">Netflix Inc.</option>
                            <option value="TSLA">Tesla Inc.</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Search</button>
                </div>
            </div>

            {
                typeof stockData['Time Series (Daily)'] !== 'undefined'
                    ? <StockChartSummary stockData={stockData}/> 
                    : null
            }
        </div>
    )
}

export default connect(
    state => {
        return {
            stockData: state.stockData.currentStockData,
            authorized: state.user.authorized
        }
    }, 
    { getStockData }
)(StockChartsList);