import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";

const CoinData = (props) => {
    const params = useParams();
    const [historicData, setHistoricData] = useState([]);
    const [currency, setCurrency] = useState("sek");
    const [coin, setCoin] = useState();
    const [days, setDays] = useState(30);

    async function fetchCoinsHandler() {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${params.name}`);
        const data = await response.json();
        setCoin(data);
    }

    async function getHistoricData() {
        const chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${params.name}/market_chart?vs_currency=${currency}&days=30`);
        const chartData = await chartResponse.json();
        setHistoricData(chartData.prices);
    };

    useEffect(() => {
        fetchCoinsHandler()
        getHistoricData()
    }, []);
    
    return (
        <div>
            <div className="container mt-5">
                {coin ? (
                    <div className="trending mt-5">
                        <div className='group-box'>
                            <img src={coin.image.small} />
                            {coin.name}
                        </div>
                    </div>
                ) : (
                    <div>{params.name}</div>
                )
                }
                <div className="container mt-5">
                    <Line data={{
                        labels: historicData.map((coin) => {
                            let date = new Date(coin[0]);
                            let time = date.getHours() > 12
                            return days === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                            {
                                data: historicData.map((coin) => coin[1]),
                                label: `Pris ( Senaste ${days} dagar ) i ${currency.toUpperCase()}`,
                                borderColor: "#EEBC1D",
                            },
                        ],
                    }

                    }
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                }
                            }
                        }
                        }
                    />
                    <div>
                    </div>
                    {coin ? (
                        <div className="container p-5">
                            <h6 className="lead">Om: </h6>
                            <p className="text-capitalize">{coin.description.en}</p>
                            <a href={coin.links.homepage[0]}>{coin.links.homepage[0]}</a>
                        </div>
                    ) : (
                        <div>{params.name}</div>
                    )
                    }
                </div>
            </div >
        </div>
    )
}

export default CoinData