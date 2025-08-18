export type BasketItem = {
    num: number
    price: number;
}

export type OrderType = {
    id: number;
    phone: string;
    dateCreate: string;
    dateDelivery: string;
    clientName: string;
    number: string;
    state: number;
    contactType: number;
    deliveryData: Record<string, string>;
    deliveryType: number;
    payState: number;
    payType: number;
    basket: Record<string, BasketItem>;
}