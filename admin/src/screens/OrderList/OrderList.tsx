import {useEffect, useState} from "react";
import type {OrderType} from "../../types/Order.types.ts";
import {loadOrders} from "../../features/loadOrders.ts";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {type AppDispatch, type RootState} from "../../store/store.ts";
import {getStateByIndex} from "../../features/getStateByIndex.ts";
import "./OrderList.scss";
import {useNavigate} from "react-router-dom";
import { logout } from "../../store/slices/userSlice.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const OrderList = () => {

    const [list, setList] = useState<OrderType[]>([]);
    const [date, setDate] = useState<Date | null>(null);
    const [orderState, setOrderState] = useState('new');

    const {id, token} = useSelector( (state: RootState) => state.user );

    const pageNavigator = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        loadOrders(
            `${id}:${token}`,
            (orders: OrderType[]) => {setList(orders);},
            (error) => {
                if (error === 'need login') dispatch(logout());
                else toast.error(error)
            },
            orderState,
            date?.toISOString().substring(0,10) || 'all'
        );
    }, [id, token, dispatch, orderState, date]);

    const onClickHandler = (order: OrderType) => {
        pageNavigator("/order/" + order.number);
    }

    return (
        <div className="order-list">
            <header className="order-list__header">
                <div>
                    <p>state:</p>
                    <select name="state" value={orderState} onChange={(e) => setOrderState(e.target.value)}>
                        <option value="new">New</option>
                        <option value="in-process">In process</option>
                        <option value="confirmed">Confirmed</option>
                    </select>
                </div>
                <div>
                    <p>shipping date:</p>
                    <DatePicker selected={date}
                        onChange={(d) => setDate(d)}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="Выберите дату"/>
                </div>
            </header>
            <table className="order-list__table">
                <thead>
                <tr>
                    <th>Client</th>
                    <th>Phone</th>
                    <th>State</th>
                    <th>Created</th>
                    <th>Date shipping</th>
                </tr>
                </thead>
                <tbody>
                {list.map((order: OrderType) => (
                    <tr key={order.id} onClick={() => onClickHandler(order)}>
                        <td>{order.clientName}</td>
                        <td>{order.phone}</td>
                        <td>{getStateByIndex(order.state)}</td>
                        <td>{order.dateCreate}</td>
                        <td>{order.dateDelivery}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}