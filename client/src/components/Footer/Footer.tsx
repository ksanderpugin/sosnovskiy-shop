import { useLang } from "../../hooks/useLang";
import { Words } from "../../const/Words";
import "./Footer.scss";

export const Footer = () => {

    const lang = useLang() || 'uk';

    return (
        <footer className="footer">
            {Words.footerText[lang]}<sup>&copy;</sup> 2025
        </footer>
    )
}