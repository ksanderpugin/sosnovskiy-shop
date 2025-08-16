import { LogoutButton } from "../LoginButton/LogoutButton";
import "./Header.scss";

type PropTypes = {
    userName: string;
}

export const Header = ({userName}: PropTypes) => {


    return (
        <header className="header">
            <div className="wrapper">
                <p>Sosnovskiy Admin panel</p>
                {userName && <LogoutButton name={userName} />}
            </div>
        </header>
    )
}