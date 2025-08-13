import { createSlice } from "@reduxjs/toolkit"

interface IUser {
    firstName: string;
    lastName: string;
    phone: string;
    contactType: string;
    deliveryType: string;
    shop?: string;
    city?: string;
    address?: string;
}

const savedUserJSON = localStorage.getItem('ud');

const initialState: IUser = JSON.parse(savedUserJSON || 'false') || {
    firstName: '',
    lastName: '',
    phone: '',
    contactType: '0',
    deliveryType: 'npa'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phone = action.payload.phone;
            state.contactType = action.payload.contactType;
            state.deliveryType = action.payload.deliveryType;
            state.shop = action.payload.shop || null;
            state.city = action.payload.city || null;
            state.address = action.payload.address || null;
            localStorage.setItem('ud', JSON.stringify(state));
        }
    }
});

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;