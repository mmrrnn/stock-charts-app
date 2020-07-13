import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StockChartSummary from '../StockChart/StockChartSummary';
import { getStockData } from '../../data/actions/stockDataActions'

const OptionalStockChartSummary = ({ stockData }) => {
    const condition = typeof stockData['Time Series (Daily)'] !== 'undefined';

    return condition
        ? <StockChartSummary stockData={stockData}/> : '';
}

function StockChartsList({ authorized, stockData = {}, getStockData }) {
    const [selectedStock, setSelectedStock] = useState('GOOGL');
    const isDataCorrect = useMemo(
        () => Object.entries(stockData).length > 0 && !('Note' in stockData),
        [stockData]
    );
    
    useEffect(() => {
        if(isDataCorrect){
            setSelectedStock(stockData['Meta Data']['2. Symbol'])
        }
    }, [authorized, stockData, isDataCorrect])

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

            <OptionalStockChartSummary stockData={stockData} />            
        </div>
    )
}

StockChartsList.propTypes = {
    authorized: PropTypes.bool.isRequired,
    stockData: PropTypes.object.isRequired,
    getStockData: PropTypes.func.isRequired    
}

export default connect(
    state => {
        return {
            authorized: state.user.authorized,
            stockData: state.stockData.currentStockData
        }
    }, 
    { getStockData }
)(StockChartsList);