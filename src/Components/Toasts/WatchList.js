import { Toast, ToastContainer } from 'react-bootstrap';

const WatchList = (props) => {
    return (
        <ToastContainer className='position-fixed top-5 end-0 m-2' position='bottom-end'>
            {props.toast ? props.toast.map((coin) => (
                <Toast key={coin.name} onClose={() => props.removeItem(coin.name)} show={true} className='toast top-5 end-0 m-2'>
                    <Toast.Header>
                        <img src={coin.image} className="rounded me-2" alt="" />
                        <strong className="me-auto">{coin.name}</strong>
                    </Toast.Header>
                    <Toast.Body>Senaste pris: {coin.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Toast.Body>
                </Toast>
            )) : <div></div>}
        </ToastContainer>
    )
};
export default WatchList;