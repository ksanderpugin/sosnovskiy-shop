import type { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/strore";
import { addToBasket, takeFromBasket } from "../../store/slices/basketSlice";
import { useLang } from "../../hooks/useLang";
import "./OrderItem.scss";

type PropTypes = {
    posId: number;
    packId: number;
    icon: string;
    name: string; 
    packInfo: string;
    num: number;
    price: number;
    cost: number;
    disablad?: boolean;
}

export const OrderItem = ({posId, packId, icon, name, packInfo, num, price, cost, disablad = false}: PropTypes) => {

    const lang = useLang() || 'uk';

    const dispatch = useDispatch<AppDispatch>();

    const clickHandler: MouseEventHandler<HTMLParagraphElement> = (e) => {
        if (disablad) return;
        const el = e.target as HTMLParagraphElement;
        if (el.tagName.toLowerCase() === 'span') {
            if (el.textContent == '+') {
                dispatch(addToBasket({posId, packId}));
            } else {
                dispatch(takeFromBasket({posId, packId}));
            }
        }
    }

    return (
        <tr className="order-item">
            <td>
                <p className="order-item__icon">
                    <img src={icon} alt={name} />
                </p>
            </td>
            <td>
                <p className="order-item__title">
                    <span className="order-item__title-name">{name}</span>
                    <span className="order-item__title-pack">{packInfo} | {cost} {lang == 'en' ? 'uah/kg' : 'грн/кг'}</span>
                </p>
            </td>
            <td>
                <p className="order-item__num" onClick={clickHandler}>
                    {!disablad && <span>-</span>}
                    <b>{`${num} ${lang == 'en' ? 'op' : 'уп'}`}</b>
                    {!disablad && <span>+</span>}
                </p>
            </td>
            <td>
                <p className="order-item__price">{price} <span>{lang == 'en' ? 'uah' : 'грн'}</span></p>
            </td>
        </tr>
    );
}