import { Link } from "react-router-dom";
import { useLang } from "../../hooks/useLang";
import { NotFound404 } from "../";
import { Form, ShopMap } from "../../components";
import { getHref } from "../../features/getHref";
import { showToast } from "../../features/showToast";
import { FeedBackMeta, FeedBackSchema } from "../../schimas/FeedBackSchema";
import { Words } from "../../const/Words";
import "./Contacts.scss";

export const Contacts = () => {

    const lang = useLang();

    if (!lang) return (<NotFound404 />);

    const onSubmit = (data: Record<string, unknown>, reset?: ( () => void | undefined) ) => {
        return fetch(`${import.meta.env.VITE_BASE_URL}/feedback`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then( resp => resp.json() )
        .then( rData => {
            if (rData.ok) {
                if (reset) reset();
                showToast(`💬 ${Words.sentMes[lang]}`);
            }
        });     
    }

    return (
        <section className="contacts">
            <div className="wrapper">

                <h1 className="main-title">
                    <Link to={getHref(lang, '/')}>{Words.main[lang]}</Link> ➤ {Words.contacts[lang]}
                </h1>
                <div className="contacts-info">
                    <div className="contacts-info__content">
                        <p>{Words.contactCenter[lang]}</p>
                        <p>096-799-78-78</p>
                        <p>Viber | Telegram</p>
                        <p>
                            <b>shop@sosnovskiy.com</b>
                        </p>
                        <p>{Words.orderProcessing[lang]}:</p>
                        <p>{Words.processingTime[lang]}</p>
                    </div>
                    <div className="contacts-info__map">
                        <h2>{Words.shopsMap[lang]}</h2>
                        <ShopMap />
                    </div>
                </div>
                <div className="contacts-feedback">
                    <h2>{Words.feedbackForm[lang]}</h2>
                    <Form 
                        schema={FeedBackSchema(lang)} 
                        meta={FeedBackMeta(lang)} 
                        onSubmitHandler={onSubmit}
                        buttonTitle={Words.submit[lang]} />
                </div>
            </div>
        </section>
    );
}