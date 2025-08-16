import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/strore";
import { showMobileMenu } from "../../store/slices/mobileMenuSlice";
import "./BurgerButton.scss";

export const BurgerButton = () => {

    const dispatch = useDispatch<AppDispatch>();

    const onClickHandler = () => {
        dispatch(showMobileMenu());
    }

    return (
        <button className="burger-button" onClick={onClickHandler}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
}