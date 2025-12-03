import type {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {logout} from "../../store/slices/userSlice.ts";

type PropTypes = {
    name: string;
}

export const LogoutButton = ({name}: PropTypes) => {

    const dispatch = useDispatch<AppDispatch>();

    const onClickHandler = () => {
        dispatch(logout());
    }

    return (
        <a className="logout" onClick={onClickHandler}>{name}</a>
    )
}