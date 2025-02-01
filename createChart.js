export let myChart;

export const createChart = (symbol, time, dataStocks) => {
    const data = dataStocks[symbol][time];

    if (!data) {
        console.error('No data available for:', symbol, time);
        return;
    }

    const value = data.value;
    const timeStampData = data.timeStamp;
    const calTime = timeStampData.map((timeStamp) => new Date(timeStamp * 1000).toLocaleDateString());
    

    const lowValue = Math.min(...value);
    const peakValue = Math.max(...value);

    const ctx = document.getElementById('myChart');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: calTime,
            datasets: [{
                label: symbol,
                data: value,
                borderColor: 'green'
            }]
        },
        options: {
            plugins: {
                annotation: {
                    annotations: {
                        lowValue: {
                            type: 'line',
                            yMin: lowValue,
                            yMax: lowValue,
                            borderColor: 'red',
                            borderWidth: 2,
                            label: {
                                content: `Low: ${lowValue}`,
                                enabled: true,
                                position: 'end'
                            }
                        },
                        peakValue: {
                            type: 'line',
                            yMin: peakValue,
                            yMax: peakValue,
                            borderColor: 'blue',
                            borderWidth: 2,
                            label: {
                                content: `Peak: ${peakValue}`,
                                enabled: true,
                                position: 'end'
                            }
                        }
                    }
                }
            }
        }
    });
}