import { LogoutButton } from "../LogoutButton/LogoutButton";
import "./Header.scss";
import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {HomeButton} from "../HomeButton/HomeButton.tsx";

type PropTypes = {
    userName: string;
    userRole: string;
}

export const Header = ({userName, userRole}: PropTypes) => {

    const loc = useLocation();
    console.log(loc.pathname);

    const headerTitle = useMemo(() => {
        switch (loc.pathname) {
            case "/":
                switch (userRole) {
                    case "admin":
                        return "Admin Panel";

                    case "operator":
                        return "Обработка заказов";

                    case "saler":
                        return "Магазины";

                    default: return "App";
                }

            case "/orderList":
                return "Список заказов";

            case "/packList":
                return "Упаковка заказов";

            default:
                return "nn";
        }
    }, [loc, userRole]);

    return (
        <header className="header">
            <div className="wrapper">
                {loc.pathname.length > 3 && <HomeButton />}
                <p>
                    Сосновський | {headerTitle}
                </p>
                {userName && <LogoutButton name={userName} />}
            </div>
        </header>
    )
}