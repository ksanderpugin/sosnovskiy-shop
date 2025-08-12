import { Link } from "react-router-dom";
import { useLang } from "../../hooks/useLang";
import { NotFound404 } from "../NotFound404/NotFound404";
import { getHref } from "../../features/getHref";
import { Form, ShopMap } from "../../components";
import { FeedBackMeta, FeedBackSchema } from "../../schimas/FeedBackSchema";
import { NotificationCenter } from "../../features/NotificationCenter/NotificationCenter";
import "./Contacts.scss";
import { Words } from "../../const/Words";

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
                NotificationCenter.showMessage('Your messege sent. Thanks');
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
                        <p>Contact Center</p>
                        <p>096-799-78-78</p>
                        <p>Viber | Telegram</p>
                        <p>
                            <b>shop@sosnovskiy.com</b>
                        </p>
                        <p>Order processing:</p>
                        <p>Mon-Sat from 10:00 to 20:00</p>
                    </div>
                    <div className="contacts-info__map">
                        <h2>Offline stores map</h2>
                        <ShopMap />
                    </div>
                </div>
                <div className="contacts-feedback">
                    <h2>Feedback form</h2>
                    <Form 
                        schema={FeedBackSchema} 
                        meta={FeedBackMeta} 
                        onSubmitHandler={onSubmit}
                        buttonTitle="Submit" />
                </div>
            </div>
        </section>
    );
}