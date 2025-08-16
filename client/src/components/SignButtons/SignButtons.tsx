import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/strore";
import { useLang } from "../../hooks/useLang";
import { Words } from "../../const/Words";
import "./SignButtons.scss";

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