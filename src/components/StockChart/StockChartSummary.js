import React, { useEffect, useMemo, useCallback, createRef } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-charts';

import { toggleSubscribeStock } from '../../data/actions/user-action';

function StockChartSummary({ user, stockData, toggleSubscribeStock }) {    
    const stockSymbol = stockData['Meta Data']['2. Symbol'];
    const chartData = useMemo(
        () => Object.entries(stockData[Object.keys(stockData)[1]])
            .reverse()
            .splice(50, 50)
            .map(el => [el[0], el[1]['4. close']]),
        [stockData]
    );
    const subscribeCheckbox = createRef();

    useEffect(() => {
        if(user.authorized)subscribeCheckbox.current.checked = user.subscribedStock === stockSymbol ? true : false; 
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
            e.target.checked 
                ? toggleSubscribeStock({ username: user.username, stockSymbol })
                : toggleSubscribeStock({ username: user.username, stockSymbol: null });
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

export default connect(
    state => {
        return {
            user: state.user
        }
    },
    { toggleSubscribeStock }
)(StockChartSummary);