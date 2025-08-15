import { useSelector } from "react-redux";
import { Words } from "../../const/Words";
import { useLang } from "../../hooks/useLang";
import "./SignButtons.scss";
import type { RootState } from "../../store/strore";
import { Link } from "react-router-dom";

export const SignButtons = () => {

    const lang = useLang() || 'uk';

    const {firstName, authorized} = useSelector( (state: RootState) => state.user );

    return (
        <div className="sign-buttons" style={ authorized ? {} : {visibility: 'hidden'} }>
            <Link to="/cabinet">{authorized ? firstName : Words.login[lang]}</Link>
            {/* <button>{Words.signup[lang]}</button> */}
        </div>
    );
}