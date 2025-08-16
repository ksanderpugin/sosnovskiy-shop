import {store} from "../store/store.ts";

export const loadOrder = (number: string) => {

    const {id, token} = store.getState().user;

    fetch(`${import.meta.env.VITE_BASE_URL}/order/${number}`, {
        headers: {
            Authorization: `Bearer ${id}:${token}`,
        }
    })
}