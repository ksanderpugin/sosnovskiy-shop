import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/strore";
import { useLang } from "../../hooks/useLang";
import { getHref } from "../../features/getHref";
import { CheckOutForm, OrderList } from "../../components";
import { NotFound404 } from "../";
import { Words } from "../../const/Words";

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