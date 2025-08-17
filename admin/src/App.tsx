import { Header } from "./components";
import "./App.scss"
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "./store/store";
import {Route, Routes} from "react-router-dom";
import { AuthScreen } from "./screens/AuthScreen/AuthScreen";
import { ToastContainer } from "react-toastify";
import {OrderList} from "./screens/OrderList/OrderList.tsx";
import {Order} from "./screens/Order/Order.tsx";
import { useEffect } from "react";
import { fetchProducts } from "./store/slices/productsSlice.ts";

export const App = () => {

    const userName = useSelector( (state: RootState) => state.user.name );
    const productLoadState = useSelector( (state: RootState) => state.products.state );

    const dispatch = useDispatch<AppDispatch>();

    useEffect( () => {
        if (productLoadState === 'idle') dispatch(fetchProducts());
        else if (productLoadState === 'error') {
            setTimeout( () => {
                dispatch(fetchProducts());
            }, 1000);
        }
    }, [productLoadState, dispatch]);

    return (
        <>
            <Header userName={userName} />
            <main className="main wrapper">

                {userName && <Routes>
                    <Route path="/" element={<OrderList />} />
                    <Route path="/order/:number" element={<Order />} />
                </Routes>}

                {!userName && <AuthScreen />}
            </main>
            <ToastContainer />
        </>
    )
}