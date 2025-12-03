import { createSlice } from "@reduxjs/toolkit"

interface IUser {
    firstName: string;
    lastName: string;
    phone: string;
    contactType: string;
    deliveryType: string;
    shop?: string;
    city?: string;
    cityRef?: string;
    address?: string;
    authorized?: boolean;
    token?: string;
}

const savedUserJSON = localStorage.getItem('ud');

const initialState: IUser = JSON.parse(savedUserJSON || 'false') || {
    firstName: '',
    lastName: '',
    phone: '',
    contactType: '0',
    deliveryType: 'npo',
    authorized: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.firstName = action.payload.firstName || '';
            state.lastName = action.payload.lastName || '';
            state.phone = action.payload.phone || '';
            state.contactType = action.payload.contactType || '0';
            state.deliveryType = action.payload.deliveryType || 'npa';
            state.shop = action.payload.shop;
            state.city = action.payload.city;
            state.address = action.payload.address;
            localStorage.setItem('ud', JSON.stringify(state));
        },
        setCityRef: (state, action) => {
            state.cityRef = action.payload.ref || '';
            state.city = action.payload.name || '';
            localStorage.setItem('ud', JSON.stringify(state));
        }
    }
});

export const { setUserData, setCityRef } = userSlice.actions;
export default userSlice.reducer;