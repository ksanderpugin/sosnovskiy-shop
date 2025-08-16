import { Header } from "./components";
import "./App.scss"
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import {Route, Routes} from "react-router-dom";
import { AuthScreen } from "./screens/AuthScreen/AuthScreen";
import { ToastContainer } from "react-toastify";
import {OrderList} from "./screens/OrderList/OrderList.tsx";
import {Order} from "./screens/Order/Order.tsx";

export const App = () => {

    const userName = useSelector( (state: RootState) => state.user.name );

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