import type { NovaPostCities } from "../types/NovaPostCities.types";

export const loadNovaPostCities = (search: string, success?: (cities: NovaPostCities[]) => void, reject?: (error: string) => void) => {
    if (search.length < 3) return;
    const data = {
        "apiKey": import.meta.env.VITE_NOVA_POST_KEY,
        "modelName": "AddressGeneral",
        "calledMethod": "getSettlements",
        "methodProperties": {
            "FindByString": search,
            "Page": "1",
            "Warehouse": "1",
            "Limit": "10"
        }
    }
    fetch(import.meta.env.VITE_NOVA_POST_API_URL, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then( resp => resp.json() )
    .then( data => {
        if (data.success && success) success(data.data);
    })
    .catch( error => {
        if (reject) reject(error)
    })
}