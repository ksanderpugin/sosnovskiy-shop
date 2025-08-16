import { createSlice } from "@reduxjs/toolkit";
import type { BasketItem } from "../../types/BasketItem.types";

export type BasketStateType = {
    list: Record<string, BasketItem>;
}

const basketListJSON = localStorage.getItem('basket');
const basketList = basketListJSON && JSON.parse(basketListJSON);

const initialState: BasketStateType = {
    list: basketList || {}
}

const saveBasket = (list: Record<string, BasketItem>) => {
    localStorage.setItem('basket', JSON.stringify(list));
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const key = `pos_${action.payload.posId}_${action.payload.packId}`;
            if (key in state.list) {
                state.list[key].num++;
            } else {
                state.list[key] = {
                    num: 1,
                    price: action.payload.price
                }
            }
            saveBasket(state.list);
        },
        takeFromBasket: (state, action) => {
            const key = `pos_${action.payload.posId}_${action.payload.packId}`;
            if (key in state.list) {
                state.list[key].num--;
                if (state.list[key].num < 1) delete state.list[key];
            }
            saveBasket(state.list);
        },
        deleteFromBasket: (state, action) => {
            const key = `pos_${action.payload.posId}_${action.payload.packId}`;
            delete state.list[key];
            saveBasket(state.list);
        },
        clearBasket: (state) => {
            state.list = {};
            localStorage.removeItem('basket');
        }
    }
});

export const { addToBasket, takeFromBasket, deleteFromBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;