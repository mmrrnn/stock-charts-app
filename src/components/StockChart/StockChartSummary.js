import React, { useEffect, useMemo, useCallback, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Chart } from 'react-charts';

import { toggleSubscribeStock } from '../../data/actions/userActions';

function StockChartSummary({ user, stockData, toggleSubscribeStock }) {    
    const { stockSymbol, chartData } = stockData; 
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
                height: '300px'
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