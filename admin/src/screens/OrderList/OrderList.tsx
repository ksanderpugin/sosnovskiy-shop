import {useEffect, useState} from "react";
import type {Order} from "../../types/Order.types.ts";
import {loadOrders} from "../../features/loadOrders.ts";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {type AppDispatch, type RootState} from "../../store/store.ts";
import {getStateByIndex} from "../../features/getStateByIndex.ts";
import "./OrderList.scss";
import {useNavigate} from "react-router-dom";
import { logout } from "../../store/slices/userSlice.ts";


export const OrderList = () => {

    const [list, setList] = useState<Order[]>([]);

    const {id, token} = useSelector( (state: RootState) => state.user );

    const pageNavigator = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        loadOrders(
            `${id}:${token}`,
            (orders: Order[]) => {setList(orders);},
            (error) => {
                if (error === 'need login') dispatch(logout());
                else toast.error(error)
            },
            'new'
        );
    }, [id, token, dispatch]);

    console.log(list);

    const onClickHandler = (order: Order) => {
        pageNavigator("/order/" + order.number);
    }

    return (
        <div className="order-list">
            <h1>Orders</h1>
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
                {list.map((order: Order) => (
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