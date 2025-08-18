import "./OrderOptions.scss";

type PropTypes = {
    addPositionHandler: () => void;
    postponeOrder: () => void;
    confirmOrder: () => void;
}

export const OrderOptions = ({addPositionHandler, postponeOrder, confirmOrder}: PropTypes) => {
    return (
        <ul  className="order-options">
            <li onClick={addPositionHandler} className="button">Добавить</li>
            <li onClick={postponeOrder} className="button">Отложить</li>
            <li onClick={confirmOrder} className="button">Подтвердить</li>
        </ul>
    )
}