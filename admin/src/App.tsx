import { Header } from "./components";
import "./App.scss"
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "./store/store";
import {Route, Routes} from "react-router-dom";
import { AuthScreen } from "./screens/AuthScreen/AuthScreen";
import { ToastContainer } from "react-toastify";
import {OrderList} from "./screens/OrderList/OrderList.tsx";
import {Order} from "./screens/Order/Order.tsx";
import {useEffect} from "react";
import { fetchProducts } from "./store/slices/productsSlice.ts";
import {MainScreen} from "./screens/MainScreen/MainScreen.tsx";
import {PackList} from "./screens/PackList/PackList.tsx";

export const App = () => {

    const {name: userName, role: userRole} = useSelector( (state: RootState) => state.user );
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

    // const MainElement = useMemo( () => {
    //     switch ( userRole ) {
    //         case 'admin':
    //             return <OrderList />;
    //
    //         case 'manager':
    //             return <ShopAppMainWindow />;
    //     }
    // }, [ userRole ] );

    return (
        <>
            <Header userName={userName} userRole={userRole} />
            <main className="main wrapper">

                {userName && <Routes>
                    <Route path="/" element={<MainScreen role={userRole} />} />

                    <Route path="/orderList" element={<OrderList />} />
                    <Route path="/order/:number" element={<Order />} />

                    <Route path="/packList" element={<PackList />} />
                </Routes>}

                {!userName && <AuthScreen />}
            </main>
            <ToastContainer />
        </>
    )
}