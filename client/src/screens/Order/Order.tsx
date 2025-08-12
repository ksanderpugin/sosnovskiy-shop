import { useDispatch, useSelector } from "react-redux";
import { useLang } from "../../hooks/useLang"
import type { AppDispatch, RootState } from "../../store/strore";
import { Link, useParams } from "react-router-dom";
import { getHref } from "../../features/getHref";
import { NotFound404 } from "../NotFound404/NotFound404";
import { useEffect, useState } from "react";
import { setOrder } from "../../store/slices/orderSlice";
import { Loader, OrderList } from "../../components";
import { Words } from "../../const/Words";
import "./Order.scss";
import { shops } from "../../const/Shops";
import { CheckOutMeta } from "../../schimas/CheckOutSchema";
import { isoDateToString } from "../../features/isoDateToString";

export const Order = () => {

    const lang = useLang();
    const {number} = useParams();

    const order = useSelector( (state: RootState) => state.order.order );
    const dispatch = useDispatch<AppDispatch>();

    const [error, setError] = useState('');

    useEffect( () => {
        if (!order || number !== order.number) {
            fetch(`${import.meta.env.VITE_BASE_URL}order/${number}`)
                .then( resp => resp.json() )
                .then( data => {
                    if (data.ok) {
                        dispatch(setOrder(data.order));
                    } else {
                        setError(data.error);
                    }
                })
        }
    }, [number, order, dispatch]);

    if (!lang) return (<NotFound404 />);

    if (error) return (<p>{error}</p>);

    if (!order || order.number != number) return (<div className="loader-wrapper"><Loader/></div>);

    const getAddress = () => {
        if (order.deliveryType === 3) {
            const shop = shops.find( item => item.name === order.deliveryData.shop )
            if (shop) return shop.address[lang];
            return '';
        }
        
        return `${order.deliveryData.city}, ${order.deliveryData.address}`.replace(/\d+\/\d+;/, '');
    }
    return (
        <section className="order-info wrapper">
            <h1 className="main-title">
                <Link to={getHref(lang, '/')}>{Words.main[lang]}</Link> ➤ {Words.order[lang]} {order.id}
            </h1>

            <div className="order-info__data">
                <p><b>{Words.orderStatus[lang]}:</b></p>
                <p>{Words.orderStates[order.state][lang]}</p>
                
                <p><b>{Words.customer[lang]}:</b></p>
                <p>{order.clientName}, {order.phone}</p>
                
                <p><b>{lang === 'en' ? 'Shipping' : 'Доставка'}:</b></p>
                <p>{CheckOutMeta.deliveryBy.options[order.deliveryType].title[lang]}: {getAddress()}</p>
                
                <p><b>{CheckOutMeta.dispatchDate.label[lang]}:</b></p>
                <p>{isoDateToString(order.dateDelivery, lang)}</p>
            </div>

            <OrderList order={order.basket} />
        </section>
    )
}