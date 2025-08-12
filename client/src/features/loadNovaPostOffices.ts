import type { NovaPostOffice } from "../types/NovaPostOffice.types";

export const loadNovaPostOffices = (cityRef: string, success?: (data: NovaPostOffice[]) => void, reject?: (error: string) => void) => {
    const data = {
        "apiKey": import.meta.env.VITE_NOVA_POST_KEY,
        "modelName": "AddressGeneral",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "SettlementRef": cityRef
        }
    }
    fetch(import.meta.env.VITE_NOVA_POST_API_URL, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then( resp => resp.json() )
    .then( data => {
        console.log(data);
        if (data.success && success) success(data.data);
    })
    .catch( error => {
        if (reject) reject(error)
    });
}