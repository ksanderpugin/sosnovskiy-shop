import type {OrderType} from "../types/Order.types.ts";
import {store} from "../store/store.ts";

export const sendUpdatedOrder = async (order: OrderType) => {

    const {id, token} = store.getState().user;

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}order/${order.number}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${id}:${token}`,
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error(`load order error: ${response.status}`);
        }

        const data = await response.json();
        if (data.ok) return data.order;
        else throw new Error(`load order error: ${data.error}`);

    } catch (error) {
        console.log(error);
        throw error;
    }
}