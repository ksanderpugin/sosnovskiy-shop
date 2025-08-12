import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../hooks/useLang";
import { NotFound404 } from "../";
import { Loader } from "../../components";
import { getHref } from "../../features/getHref";
import { Words } from "../../const/Words";
import parse from "html-react-parser";
import "./ShippingAndPay.scss";

export const ShippingAndPayment = () => {

    const lang = useLang();

    const [loading, setLoading] = useState(false);

    const [html, setHtml] = useState('');

    useEffect( () => {
        if (!lang) return;
        setLoading(true);
        fetch(`${import.meta.env.VITE_BASE_URL}shipping/${lang}`)
            .then( resp => resp.json() )
            .then( data => {
                if (data.ok) {
                    setHtml(data.html);
                    setLoading(false);
                }
            });
    }, [lang]);

    if (!lang) return (<NotFound404 />);

    return (
        <section className="shipping bigtext">
            <div className="wrapper">
                <h1 className="main-title">
                    <Link to={getHref(lang, '/')}>{Words.main[lang]}</Link> ➤ {Words.shipping[lang]}
                </h1>
                {loading && <div className="main-loader"><Loader /></div>}
                {parse(html)}
            </div>
        </section>
    )
}