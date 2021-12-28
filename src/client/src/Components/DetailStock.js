import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Chart from "react-google-charts";
import { useParams } from 'react-router';
// import { getStockData } from '../service'

function DetailStock() {
    const [stockData, setStockData] = useState([
        [0, 216.99, 215.46],
        [1, 226.99, 214.67],
        [2, 226.75, 218.67],
        [3, 229, 223.91],
        [4, 231.27, 227.63],
        [5, 229.86, 230.27],
        [6, 229.72, 230.91],
        [7, 229.58, 230.92],
        [8, 237.75, 231.09],
        [9, 235.58, 235.71],
        [10, 238.36, 238.56],
        [11, 243.75, 240.45],
        [12, 244.72, 244.5],
        [13, 248.91, 247.43],
        [14, 254.61, 250.87],
        [15, 254.47, 256.15],
        [16, 252.5, 257.77],
        [17, 252.94, 256.44],
        [18, 250.63, 256.29],
        [19, 251.92, 255.27],
        [20, 249.24, 255.63],
        [21, 251.55, 254.27],
        [22, 251.33, 254.76],
        [23, 257.76, 255.11],
        [24, 257.48, 259.37],
        [25, 262.07, 260.66],
        [26, 269.2, 263.56],
        [27, 269.23, 269.74],
        [28, 280.6, 270.39],
        [29, 280.98, 279.05],
        [30, 279.76, 279.33],
        [31, 268.95, 278.17],
        [32, 272.23, 271.15],
        [33, 277.39, 273.36],
        [34, 273.51, 278.85],
        [35, 255.99, 275.08],
        [36, 257, 262.59],
        [37, 246.22, 259.13],
        [38, 249.99, 253.92],
        [39, 250.02, 253.12],
        [40, 250.47, 253.8],
        [41, 251.57, 253.89],
        [42, 251.21, 254.12],
        [43, 248.58, 253.84],
        [44, 246.86, 251.92],
        [45, 244.89, 250.01],
        [46, 243.69, 248.24],
        [47, 246.16, 246.87],
        [48, 258, 247.86],
        [49, 255.72, 256.77],
        [50, 262.04, 258.28],
        [51, 261.5, 261.76],
        [52, 216.99, 262.54],
        [53, 226.99, 242.64],
        [54, 226.75, 231.38],
        [55, 229, 227.49],
        [56, 231.27, 230.16],
        [57, 229.86, 234.71],
        [58, 229.72, 235.51],
        [59, 229.58, 234.36],
        [60, 237.75, 233.32],
        [61, 235.58, 237.34],
        [62, 238.36, 239.38],
        [63, 243.75, 240.65],
        [64, 244.72, 244.25],
        [65, 248.91, 246.67],
        [66, 254.61, 249.78],
        [67, 254.47, 254.87],
        [68, 252.5, 256.4],
        [69, 252.94, 255.05],
        [70, 250.63, 254.93],
        [71, 251.92, 254],
        [72, 249.24, 254.46],
        [73, 251.55, 253.23],
        [74, 251.33, 253.84],
        [75, 257.76, 254.33],
        [76, 257.48, 258.74],
        [77, 262.07, 260.16],
        [78, 269.2, 263.18],
        [79, 269.23, 269.46],
        [80, 280.6, 270.2],
        [81, 280.98, 278.92],
        [82, 279.76, 279.25],
        [83, 268.95, 278.13],
        [84, 272.23, 271.13],
        [85, 277.39, 273.36],
        [86, 273.51, 278.86],
        [87, 255.99, 275.1],
        [88, 257, 262.62],
        [89, 246.22, 259.15],
        [90, 249.99, 253.94],
        [91, 250.02, 253.13],
        [92, 250.47, 253.8],
        [93, 251.57, 253.89],
        [94, 251.21, 254.12],
        [95, 248.58, 253.84],
        [96, 246.86, 251.92],
        [97, 244.89, 250.01],
        [98, 243.69, 248.24],
        [99, 246.16, 246.87],
        [100, 258, 247.86],
        [101, 255.72, 256.77],
        [102, 262.04, 258.28],
        [103, 261.5, 261.76],
      ])
    const [Loading, setLoading] = useState(true)
    const { name } = useParams()
    
    const fetchData = async () => {
        setLoading(true);
        try {
            const stockResponse = await axios.get("http://localhost:8000" + "/stock_prediction/?company=" + name.toLowerCase())
            console.log(stockResponse)
            let newData = [];
            for (let i = 0; i < stockResponse.real_prices.length; i++) {
                newData.push([i, stockResponse.real_prices[i], stockResponse.predicted_prices[i]])
            }
            setStockData([...newData])
        } catch (e) {
            console.error(e)
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div class="flex flex-col items-center justify-center h-screen px-40">
            <div class="text-center mb-5">
                <p class="mt-10 text-sm leading-7 text-gray-500 font-regular uppercase">
                    PREDICTION
                </p>
                <h3 class="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                    Check  <span class="text-purple-600">Future</span>
                </h3>
            </div>
            <div className="flex justify-center items-center w-full h-3/6">
                <div className="flex justify-center items-center w-3/6 h-full text-center">
                    {
                        Loading ? <h6>Loading ...</h6> :
                            <Chart
                                width={'600px'}
                                height={'400px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['x', 'Actual', 'Predicted'], ...stockData
                                ]}
                                options={{
                                    hAxis: {
                                        title: 'Days',
                                    },
                                    vAxis: {
                                        title: 'Price',
                                    },
                                    series: {
                                        1: { curveType: 'function' },
                                    },
                                }}
                                rootProps={{ 'data-testid': '2' }}
                            />
                    }
                </div>
                <div className="flex flex-col justify-center items-start  w-3/6 h-full">
                    <h1 className="font-bold text-3xl m-4">Stock Prediction of {name}</h1>
                    <p className="px-4 py-4">These are the major factors which leads us to this prediction</p>
                    <ol className="m-10 mt-2">
                        <li className="m-4">➫&nbsp;&nbsp;&nbsp;Supply and Demand</li>
                        <li className="m-4">➫&nbsp;&nbsp;&nbsp;Company Financial Performance</li>
                        <li className="m-4">➫&nbsp;&nbsp;&nbsp;Broad Economic Trends</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default DetailStock
