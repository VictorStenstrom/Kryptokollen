import React from 'react';
import { useState, useEffect } from 'react';
import Coin from './Coin';

const CoinsList = (props) => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    const searchHandler = () => {
        setCoins(coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase())));
    }

    function fetchCoinsHandler(e) {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${props.currency}&order=market_cap_desc&per_page=100&page=3`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const transformedCoins = data.map((coinData) => {
                    return {
                        id: coinData.id,
                        name: coinData.name,
                        image: coinData.image.replace('large', 'thumb'),
                        price: coinData.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        cap: coinData.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        priceChange: coinData.market_cap_change_percentage_24h.toFixed(2)
                    };
                });
                setCoins(transformedCoins);
                if (e) {
                    searchHandler();
                }
            });
    }
    useEffect(() => {
        fetchCoinsHandler(search);
    }, [props.currency, search]);

    useEffect(() => {
        setSearch(props.searchValue)
    }, [props.searchValue]);

    return (
        <div className='coin-list'>
            {coins.map((coin) => (
                <Coin className='single-coin'
                    id={coin.id}
                    key={coin.id}
                    image={coin.image}
                    name={coin.name}
                    price={coin.price}
                    priceChange={coin.priceChange}
                    cap={coin.cap}
                    setCurrency={props.currency}
                    addCoinToStorage={props.addCoinToStorage}
                />
            ))}
        </div>
    );
};

export default CoinsList; 