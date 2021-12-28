import React, { useState, useEffect, useContext } from 'react';
import Chart from "react-google-charts";
import { useParams } from 'react-router';
import { getStockData } from '../service'

function DetailStock() {
    const [stockData, setStockData] = useState({})
    const [Loading, setLoading] = useState(true)
    const { name } = useParams()
    const response = {
        "real_prices": [
            216.99,
            226.99,
            226.75,
            229.0,
            231.27,
            229.86,
            229.72,
            229.58,
            237.75,
            235.58,
            238.36,
            243.75,
            244.72,
            248.91,
            254.61,
            254.47,
            252.5,
            252.94,
            250.63,
            251.92,
            249.24,
            251.55,
            251.33,
            257.76,
            257.48,
            262.07,
            269.2,
            269.23,
            280.6,
            280.98,
            279.76,
            268.95,
            272.23,
            277.39,
            273.51,
            255.99,
            257.0,
            246.22,
            249.99,
            250.02,
            250.47,
            251.57,
            251.21,
            248.58,
            246.86,
            244.89,
            243.69,
            246.16,
            258.0,
            255.72,
            262.04,
            261.5,
            216.99,
            226.99,
            226.75,
            229.0,
            231.27,
            229.86,
            229.72,
            229.58,
            237.75,
            235.58,
            238.36,
            243.75,
            244.72,
            248.91,
            254.61,
            254.47,
            252.5,
            252.94,
            250.63,
            251.92,
            249.24,
            251.55,
            251.33,
            257.76,
            257.48,
            262.07,
            269.2,
            269.23,
            280.6,
            280.98,
            279.76,
            268.95,
            272.23,
            277.39,
            273.51,
            255.99,
            257.0,
            246.22,
            249.99,
            250.02,
            250.47,
            251.57,
            251.21,
            248.58,
            246.86,
            244.89,
            243.69,
            246.16,
            258.0,
            255.72,
            262.04,
            261.5
        ],
        "predicted_prices": [
            215.46,
            214.67,
            218.67,
            223.91,
            227.63,
            230.27,
            230.91,
            230.92,
            231.09,
            235.71,
            238.56,
            240.45,
            244.5,
            247.43,
            250.87,
            256.15,
            257.77,
            256.44,
            256.29,
            255.27,
            255.63,
            254.27,
            254.76,
            255.11,
            259.37,
            260.66,
            263.56,
            269.74,
            270.39,
            279.05,
            279.33,
            278.17,
            271.15,
            273.36,
            278.85,
            275.08,
            262.59,
            259.13,
            253.92,
            253.12,
            253.8,
            253.89,
            254.12,
            253.84,
            251.92,
            250.01,
            248.24,
            246.87,
            247.86,
            256.77,
            258.28,
            261.76,
            262.54,
            242.64,
            231.38,
            227.49,
            230.16,
            234.71,
            235.51,
            234.36,
            233.32,
            237.34,
            239.38,
            240.65,
            244.25,
            246.67,
            249.78,
            254.87,
            256.4,
            255.05,
            254.93,
            254.0,
            254.46,
            253.23,
            253.84,
            254.33,
            258.74,
            260.16,
            263.18,
            269.46,
            270.2,
            278.92,
            279.25,
            278.13,
            271.13,
            273.36,
            278.86,
            275.1,
            262.62,
            259.15,
            253.94,
            253.13,
            253.8,
            253.89,
            254.12,
            253.84,
            251.92,
            250.01,
            248.24,
            246.87,
            247.86,
            256.77,
            258.28,
            261.76
        ]
    }
    let newData = [];
    for(let i=0;i<response.real_prices.length;i++){
        newData.push([i,response.real_prices[i],response.predicted_prices[i]])
    }
    console.log(name)
    const fetchData = async (forceRefresh) => {
        setLoading(true);
        try {
            const stockResponse = await getStockData({ company: "google" });
            console.log(stockResponse)
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
                    {console.log(newData[0])}
                    <Chart
                        width={'600px'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'Actual', 'Predicted'],...newData
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
