import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer, Header, MobileMenu, ProductModal } from "./components";
import { AboutUs, CheckOut, Contacts, NotFound404, Order, Policy, Products, ShippingAndPayment } from "./screens";
import "./App.scss";
import { useEffect } from "react";

export const App = () => {

    useEffect( () => {

        const keyUpHandler = (keyEvent: KeyboardEvent) => {
            if (keyEvent.ctrlKey && keyEvent.code == 'KeyE')
                document.location = 'https://admin.sosnovskiy.shop';
        }

        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keyup', keyUpHandler);
        }

    }, []);

    return (
        <>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/:lang?" element={<Products />} />
                    <Route path="/:lang?/catalog/:category" element={<Products />} />
                    <Route path="/:lang?/about" element={<AboutUs />} />
                    <Route path="/:lang?/shipping-info" element={<ShippingAndPayment />} />
                    <Route path="/:lang?/contacts" element={<Contacts />} />
                    <Route path="/:lang?/checkout" element={<CheckOut />} />
                    <Route path="/:lang?/order/:number" element={<Order />} />
                    <Route path="/:lang?/policy" element={<Policy />} />
                    <Route path="/*" element={<NotFound404 />} />
                </Routes>
            </main>
            <Footer />
            <ProductModal />
            <MobileMenu />
            <ToastContainer />
        </>
    );
}