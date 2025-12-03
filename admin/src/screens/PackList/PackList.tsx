import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {RuDatePicker} from "../../components/RuDatePicker/RuDatePicker.tsx";
import {loadOrders} from "../../features/loadOrders.ts";
import {formatDate} from "../../features/formatDate.ts";
import {logout} from "../../store/slices/userSlice.ts";
import type {RootState} from "../../store/store.ts";
import type {OrderType} from "../../types/Order.types.ts";
import "./PackList.scss";
import {PackOrderDialog} from "../../components/PackOrderDialog/PackOrderDialog.tsx";

export const PackList = () => {

    const dateInit = new Date();
    if (dateInit.getHours() > 11) dateInit.setDate(dateInit.getDate() + 1);

    const [sendDate, setSendDate] = useState<Date | null>(dateInit);
    const [list, setList] = useState<OrderType[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
    const {id, token} = useSelector( (state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        loadOrders(
            `${id}:${token}`,
            (orders) => {
                console.log(orders);
                setList(orders);
            },
            (error) => {
                if (error === 'need login') dispatch(logout());
                else {
                    toast.error('Ошибка загрузки списка: ' + error);
                    setTimeout(() => {
                        const d = new Date(sendDate || Date.now());
                        setSendDate(d);
                    }, 5000);
                }
            },
            'confirmed',
            sendDate ? formatDate(sendDate, 'Y-m-d') : 'All'
        )
    }, [sendDate, dispatch, token, id]);

    return (
        <>
            <div className="pack-list">
                <header>
                    <span>Дата отправки: </span>
                    <RuDatePicker
                        selected={sendDate}
                        onChange={setSendDate}
                        dateFormat="dd.MM.YYYY"
                    />
                </header>
                {list.length > 0 && (
                    <table className="pack-list__teable">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Клиент</th>
                            <th>Нас пункт</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((item: OrderType) => (
                            <tr key={item.id} onClick={() => {setSelectedOrder(item)}}>
                                <td>{item.id}</td>
                                <td>{item.clientName}</td>
                                <td>{item.deliveryData.city || 'no city'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {selectedOrder && <PackOrderDialog
                order={selectedOrder}
                onBackClick={() => {setSelectedOrder(null)}}
            />}
        </>
    )
}