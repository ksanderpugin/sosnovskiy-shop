import { test, expect } from "vitest";
import basketReducer, { addToBasket, clearBasket, takeFromBasket, type BasketStateType } from "../store/slices/basketSlice";

test('basket reducer', () => {

    const initialSate: BasketStateType = {
        list: {}
    }

    // add to basket 1st position
    let nextState = basketReducer(initialSate, addToBasket({posId: 2, packId: 1, price: 200}));

    expect(nextState.list['pos_2_1'].num).equals(1);
    expect(nextState.list['pos_2_1'].price).equals(200);

    // count up 1st position
    nextState = basketReducer(nextState, addToBasket({posId: 2, packId: 1, price: 200}));

    expect(nextState.list['pos_2_1'].num).equals(2);
    expect(nextState.list['pos_2_1'].price).equals(200);
    expect(Object.keys(nextState.list).length).equals(1);

    // add 2nd position
    nextState = basketReducer(nextState, addToBasket({posId: 1, packId: 0, price: 100}));
    expect(Object.keys(nextState.list).length).equals(2);
    expect(nextState.list['pos_1_0'].num).equals(1);

    //count down 2nd position
    nextState = basketReducer(nextState, takeFromBasket({posId: 1, packId: 0}));
    expect(nextState.list['pos_1_0']).equals(undefined);

    // clear basket
    nextState = basketReducer(nextState, clearBasket());
    expect(Object.keys(nextState.list).length).equals(0);
});