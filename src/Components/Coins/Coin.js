import { Link } from "react-router-dom";
import "./Coin.css"

const Coin = (props) => {
  return (
    <div className="container mt-2">
      <div className="row row-cols-1 row-cols-md-5 p-3 active">
        <Link className="col-sm" to={`/CoinData/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <div className="col-sm">
            <img src={props.image} /> {props.name}
          </div>
        </Link>
        <Link className="col-sm" to={`/CoinData/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <div className="col-sm">
            {props.price} {props.setCurrency.toUpperCase()}
          </div>
        </Link>
        <Link className="col-sm" to={`/CoinData/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <div className="col-sm">
            {props.cap} {props.setCurrency.toUpperCase()}
          </div>
        </Link>
        <Link className="col-sm" to={`/CoinData/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <div className="col-sm">
            {props.priceChange} %
          </div>
        </Link>
        <div className="col-sm">
          <button type="button" className="btn btn-light" onClick={() => props.addCoinToStorage(props.image, props.name, props.price, props.cap, props.priceChange)}>Bevaka</button>
        </div>
      </div>
    </div>
  );
};

export default Coin;