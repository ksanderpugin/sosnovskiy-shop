import { Link } from "react-router-dom";
import { useLang } from "../../hooks/useLang";
import { NotFound404 } from "../";
import { CheckOutForm, OrderList } from "../../components";
import { getHref } from "../../features/getHref";
import { Words } from "../../const/Words";

export const CheckOut = () => {

    const lang = useLang();

    if (!lang) return (<NotFound404 />);

    return (
        <div className="checkout">
            <div className="wrapper">
                <h1 className="main-title">
                    <Link to={getHref(lang, '/')}>{Words.main[lang]}</Link> ➤ {Words.checkOut[lang]}</h1>
                <OrderList />
                <CheckOutForm />
            </div>
        </div>
    );
}