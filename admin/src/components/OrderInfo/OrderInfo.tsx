import type {OrderType} from "../../types/Order.types.ts";
import {DeliveryType} from "../../constants/DleiveryTypes.const.ts";
import "./OrderInfo.scss";
import {ContactByList} from "../../constants/ContactByList.const.ts";
import {NovaPostModal} from "../NovaPostModal/NovaPostModal.tsx";
import {objectToString} from "../../features/objectToString.ts";
import {useState} from "react";

type PropTypes = {
    order?: OrderType;
    updateOrderInfo?: (info: Record<string, string>) => void;
}

export const OrderInfo = ({order, updateOrderInfo}: PropTypes) => {

    const [npmShown, setNpmShown] = useState(false);

    const changeName = (name: string) => {
        const newName = prompt('Change Name', name);
        if (updateOrderInfo && newName) {
                updateOrderInfo({clientName: newName});
        }
    }

    const changePhone = (phone: string) => {
        const newPhone = prompt('Change Phone', phone);
        if (updateOrderInfo && newPhone) {
                updateOrderInfo({phone: newPhone});
        }
    }

    const changeDateDelivery = (date: string) => {
        const newPhone = prompt('Change Delivery date', date);
        if (updateOrderInfo && newPhone) {
                updateOrderInfo({dateDelivery: newPhone});
        }
    }

    if (!order) return (<div></div>);

    return (
        <>
            {
                npmShown
                &&
                <NovaPostModal
                    entered={objectToString(order.deliveryData || {})}
                    onAccept={data => {
                        if (updateOrderInfo) updateOrderInfo(data);
                        setNpmShown(false);
                    }} />
            }
            <div className="order-info">
                <p>Client</p>
                <p onClick={() => changeName(order.clientName)}>{order.clientName}</p>
                <p>Phone</p>
                <p onClick={() => changePhone(order.phone)}>{order.phone}</p>
                <p>Contact by</p>
                <p>{ContactByList[order.contactType]}</p>
                <p>Date create</p>
                <p>{order.dateCreate}</p>
                <p>Date delivery</p>
                <p onClick={() => changeDateDelivery(order.dateDelivery)}>{order.dateDelivery}</p>
                <p>Delivery type</p>
                <p>{DeliveryType[order?.deliveryType || 0]}</p>
                <p onClick={() => setNpmShown(true)}>Delivery data</p>
                <p>
                    {Object.keys(order.deliveryData || {}).map((key, index) => {
                        return (<span key={index}>
                                    <u>{key}:</u>
                                    <i>{order.deliveryData[key]}</i>
                                </span>);
                    })}
                </p>
            </div>
        </>
    );
}