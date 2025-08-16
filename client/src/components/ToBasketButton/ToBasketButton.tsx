import type { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/strore";
import { addToBasket, takeFromBasket } from "../../store/slices/basketSlice";
import type { Lang } from "../../types/Lang";
import { useLang } from "../../hooks/useLang";
import { Words } from "../../const/Words";
import "./ToBasketButton.scss";

type PropTypes = {
    id: number;
    packId?: number;
    price?: number;
}

const inBasketStr = (num: number, lang: Lang): string => {
    switch (lang) {
        case 'en':
            return `In basket ${num} op`;

        case 'ru':
            return `В корзине ${num} уп`;
    
        default:
            return `У кошику ${num} уп`;
    }
}


export const ToBasketButton = ( { id, packId, price }: PropTypes ) => {

    const lang = useLang() || 'uk';

    const basketItem = useSelector( (state: RootState) => state.basket.list[`pos_${id}_${packId}`] );

    const numAll = useSelector( (state: RootState) => Object.keys(state.basket.list).reduce( (acc, item) => item.startsWith(`pos_${id}`) ? acc + state.basket.list[item].num : acc, 0 ) );

    const dispatch = useDispatch<AppDispatch>();

    const addToBascketHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        if (typeof packId === "number" && typeof price === "number") {
            e.stopPropagation();
            dispatch(addToBasket({posId: id, packId: packId, price: price}));
            console.log(`Add to basket ${id} ${packId} ${price}`);
        }
    }

    const inBasketClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        const el = e.target as HTMLDivElement;
        if (el.tagName.toLowerCase() === 'span') {
            const payload = {posId: id, packId: packId};
            if (el.textContent === '-') dispatch(takeFromBasket(payload));
            else dispatch(addToBasket(payload));
        }
    }

    if (basketItem) return (
        <div className="in-basket" onClick={inBasketClickHandler}>
            <span>-</span>
            <b>{inBasketStr(basketItem.num, lang)}</b>
            <span>+</span>
        </div>
    )

    return (
        <div className="to-basket" onClick={addToBascketHandler}>
            {numAll > 0 ? inBasketStr(numAll, lang) : Words.toBasket[lang]}
        </div>
    )
}