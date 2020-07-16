export const stockDataMapper = rawData => {
    const entries = Object.entries(rawData);
    const stockSymbol = entries[0]?.[1]['2. Symbol'];
    const timeSeries = entries[1]?.[1];
    const note = entries?.[2];
    const result = [];

    for (const key in timeSeries) {
        result.push([key, timeSeries[key]['4. close']])
    }

    const chartData = result
        .reverse()
        .splice(50, 50);

    if(note){
        return {
            stockSymbol,
            chartData,
            note
        }
    } else {
        return {
            stockSymbol,
            chartData
        }
    }
    
}