import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import './Carousel.css'

const Carousel = (props) => {

  const [coins, setCoins] = useState([]);

  function fetchCoinsHandler() {

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${props.currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedCoins = data.map((coinData) => {
          return {
            name: coinData.name,
            symbol: coinData.symbol,
            image: coinData.image.replace('large', 'small'),
            price: coinData.current_price,
            cap: coinData.market_cap,
            priceChange: coinData.market_cap_change_percentage_24h,
            setCurrency: props.currency
          };
        });
        setCoins(transformedCoins);
      });
  }
  useEffect(() => {
    fetchCoinsHandler();
  }, [props.currency]);

  const items = coins.map((coin) => {
    let change = coin.priceChange >= 0;
    let redOrGreen = { color: change > 0 ? "rgb(14, 203, 129)" : "red" }
    return (
      <div className="trending mt-5 p-5" style={{ backgroundColor: "#f8edeb" }}>
        <img src={coin.image} />
        <h1>{coin.name}</h1>
        <h2 style={{ opacity: 0.5 }}>{coin.symbol}</h2>
        <p>{coin.price.toString()} {coin.setCurrency.toUpperCase()}</p>
        <p style={redOrGreen}>{change && '+'} {coin?.priceChange.toFixed(2)}%</p>
      </div>
    );
  });
  const respons = {
    0: {
      items: 1,
    },
    1024: {
      items: 3
    }
  };

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        autoPlay
        responsive={respons}
        items={items} />
    </div>
  );
};

export default Carousel;