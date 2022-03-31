const CurrencyChange = (props) => {

    return (
        <div className="container">
            <div className="mt-5 d-flex align-content-center">
                <button className="btn btn-light dropdown-toggle m-3" type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                    {props.currency.toUpperCase()}
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenu'>
                    <li><button onClick={(e) => props.onCurrencyChange(e.target.value)} className='dropdown-item' type='button' value='sek'>SEK</button></li>
                    <li><button onClick={(e) => props.onCurrencyChange(e.target.value)} className='dropdown-item' type='button' value='eur'>EUR</button></li>
                </ul>
                <input className="form-control m-3" placeholder="Sök" onChange={(e) => props.searchFunc(e.target.value)} type="text" />
            </div>
        </div>
    );
};

export default CurrencyChange;