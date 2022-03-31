import React, { useState, useEffect } from 'react';
import PageNavbar from './Components/Header/PageNavbar';
import Carousel from './Components/Carousel/Carousel';
import CoinsList from './Components/Coins/CoinsList';
import CurrencyChange from './Components/Header/CurrencyChange';
import TopRow from './Components/Header/TopRow';
import WatchList from './Components/Toasts/WatchList';
import CoinData from './Components/Coins/CoinData';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App(props) {
  const [toasts, setToasts] = useState([]);
  const [selectedCurrency, setCurrency] = useState('sek');
  const [search, setSearch] = useState('');

  let coins = [];

  const watchListHandler = () => {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    setToasts(values)
  };

  useEffect(() => {
    watchListHandler();
  }, []);

  const addStorage = (image, name, price, cap, priceChange) => {
    localStorage.setItem(name, JSON.stringify({ image, name, price, cap, priceChange }))
    coins.push({ image, name, price, cap, priceChange })
    setToasts(coins)
    watchListHandler();
  };
  const removeStorage = (name) => {
    localStorage.removeItem(name);
    watchListHandler();
  };

  const currencyChangeHandler = (e) => {
    setCurrency(e);
  };

  const searchFunc = (e) => {
    setSearch(e);
  }
  return (
    <React.Fragment>
      <PageNavbar />
      <section>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Carousel currency={selectedCurrency} />
              <CurrencyChange currency={selectedCurrency} onCurrencyChange={currencyChangeHandler} searchFunc={searchFunc} />
              <TopRow />
              <CoinsList currency={selectedCurrency} addCoinToStorage={addStorage} searchValue={search} />
              <WatchList toast={toasts} removeItem={removeStorage} currency={selectedCurrency} />
            </Route>
            <Route path="/CoinData/:name">
              <CoinData coinData={props.name} />
            </Route>
          </Switch>
        </Router>
      </section>
    </React.Fragment>
  );
}

export default App; 