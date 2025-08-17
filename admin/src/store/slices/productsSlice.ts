import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { ProductItemType } from "../../types/ProductItem.types"

type StateType = {
    state: 'idle' | 'pending' | 'fulfilled' | 'error';
    list: ProductItemType[]
}

const initialState: StateType = {
    state: 'idle',
    list: []
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const resp = await fetch(`${import.meta.env.VITE_BASE_URL}products`);
    const data = await resp.json();
    return data.products;
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, state => {
            state.state = 'pending';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.state = 'fulfilled';
            state.list = action.payload;
        });
        builder.addCase(fetchProducts.rejected, state => {
            state.state = 'error';
        })
    }
});

export default productSlice.reducer;