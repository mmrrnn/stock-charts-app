import React from 'react';
import { Chart } from 'react-charts';

export default function StockChartSummary({ stockData }) {
    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: Object.entries(stockData['Time Series (Daily)'])
                    .reverse()
                    .splice(50, 50)
                    .map(el => [el[0], el[1]['4. close']])
            }
        ],
        [stockData]
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left' },
        ],
        []
    )

    return (
        <div
            style={{
                width: '100%',
                height: '300px',
            }}
        >
            <Chart 
                data={data}
                axes={axes}
                tooltip
            />
        </div>
    )
}
