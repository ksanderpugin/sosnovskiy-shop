import { Link } from "react-router-dom";
import { useLang } from "../../hooks/useLang";
import { NotFound404 } from "../";
import { CheckOutForm, OrderList } from "../../components";
import { getHref } from "../../features/getHref";
import { Words } from "../../const/Words";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/strore";

export const CheckOut = () => {

    const lang = useLang();

    const emptyBasket = useSelector( (state: RootState) => Object.keys(state.basket.list).length < 1 );

    if (!lang) return (<NotFound404 />);

    return (
        <div className="checkout">
            <div className="wrapper">
                <h1 className="main-title">
                    <Link to={getHref(lang, '/')}>{Words.main[lang]}</Link> ➤ {Words.checkOut[lang]}</h1>
                {!emptyBasket && 
                    <>
                        <OrderList />
                        <CheckOutForm />
                    </>
                }
            </div>
        </div>
    );
}