import type {TUserRole} from "../../types/TUser.types.ts";
import {Link} from "react-router-dom";


type PropTypes = {
    role: TUserRole
}

export const MainScreen = ({role}: PropTypes) => (
    <div className="main-screen">
        {(role === 'admin' || role === 'operator') && <Link className="main-screen__item" to="/orderList">Список заказов</Link>}
        {(role === 'admin' || role === 'packer') && <Link className="main-screen__item" to="/packList">Упаковка заказов</Link>}
    </div>
)