import { useLang } from "../../hooks/useLang"
import { CheckBox } from "../";
import { Link } from "react-router-dom";

export const AcceptPolicyCheckbox = () => {

    const lang = useLang() || 'uk';

    return (
        <CheckBox name="accept-policy" checked={true}>
            {lang === 'uk' && <>Приймаю умови <Link to="/policy">договору оферти</Link></>}
            {lang === 'ru' && <>Принимаю условия <Link to="/policy">договора оферты</Link></>}
            {lang === 'en' && <>I accept the terms of the <Link to="/policy">offer agreement</Link></>}
        </CheckBox>
    )
}