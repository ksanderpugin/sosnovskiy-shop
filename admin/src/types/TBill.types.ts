export type TBillProduct = {
    id: number;
    price: number;
    weight: number;
    amount: number;
}

export type TBill = {
    products: TBillProduct[];
    total: number;
}