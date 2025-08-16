import type {Order} from "../types/Order.types.ts";

export const loadOrders = (
    token: string,
    resp?: (orders: Order[]) => void,
    rej?: (error: string) => void,
    state?: string,
    date?: string
) => {


    const params: Record<string, string> = {};
    if (state) params.state = state;
    if (date) params.date = date;

    const urlParams = new URLSearchParams(params);

    fetch(`${import.meta.env.VITE_BASE_URL}orders?${urlParams}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok && resp) resp(data.orders);
            if (!data.ok && rej) rej(data.error);
        })
        .catch( (error) => {
            if (rej) rej(error);
        });
}