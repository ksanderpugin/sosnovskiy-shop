import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux"
import type { RootState } from "../../store/strore"
import type { ProductItemType } from "../../types/ProductItemType";
import type { BasketItem } from "../../types/BasketItem.types";
import { Loader, OrderItem } from "../";
import { useLang } from "../../hooks/useLang";
import { Words } from "../../const/Words";
import "./OrderList.scss";

type PropTypes = {
    order?: Record<string, BasketItem>;
}

export const OrderList = ({order}: PropTypes) => {

    const basketState = useSelector( (state: RootState) => state.basket.list );

    const basket = order || basketState;

    const [list, setList] = useState<ProductItemType[]>([]);

    const [loadParams, setloadParams] = useState('');

    const lang = useLang() || 'uk';

    const fetchBasket = useCallback( (repeat = false) => {
        const bKeys = Object.keys(basket);
        const ids = bKeys.map( item => {
            const dt = item.split('_');
            return dt[1];
        });

        if (ids.length < 1) return;

        const params = new URLSearchParams({
            ids: [...new Set(ids)].join(',')
        });
        
        if (params.toString() !== loadParams || repeat) {
            fetch(`${import.meta.env.VITE_BASE_URL}/products/getByIds?${params}`)
                .then( resp => resp.json() )
                .then( data => {
                    if (data.ok) setList(data.products);
                })
                .catch( error => {
                    console.log(`Error fetch products: ${error}`);
                    setTimeout( () => fetchBasket(true), 1000);
                });
            setloadParams(params.toString());
        }
    }, [basket, loadParams]);

    useEffect( () => {
        fetchBasket();
    }, [fetchBasket]);

    const getOrderItem = useCallback( (key: string) => {
        const keyData = key.split('_');
        const product = list.find( item => item.id === +keyData[1]);
        if (!product) return;

        const pack = product.packs[+keyData[2]];

        return (
            <OrderItem 
                key={key}
                posId={product.id}
                packId={+keyData[2]}
                icon={product.iconLink}
                name={lang == 'en' ? product.nameEN : (lang == 'ru' ? product.nameRU : product.nameUK)}
                packInfo={`${Words.packNames[lang][pack.type]} ≈ ${pack.weight}g`}
                num={basket[key].num}
                cost={basket[key].price}
                price={Math.round(basket[key].price*product.packs[+keyData[2]].weight*basket[key].num/1000)}
                disablad={!!order} />
        );
    }, [list, basket, lang, order]);

    const [orderSum, orderNum] = useMemo( () => {
        if (list.length == 0) return [0, 0];
        let sum = 0;
        let num = 0;
        Object.keys(basket).forEach( key => {
            const dt = key.split('_');
            const product = list.find( item => item.id === +dt[1]);
            if (product) {
                sum += Math.round(product.packs[+dt[2]].weight * basket[key].price * basket[key].num / 1000);
                num += basket[key].num;
            }
        });
        return [sum, num];
    }, [list, basket]);

    if (list.length < 1 && Object.keys(basket).length > 0) return (
        <div style={ {display:'flex', justifyContent: 'center'} }>
            <Loader />
        </div>
    );

    return (
        <>
            <table className="order-list">
                <tbody>
                    {Object.keys(basket).map( item => getOrderItem(item))}
                </tbody>
            </table>
            <p className="order-list-summary">{Words.totalOrdreSum(orderNum, orderSum)[lang]}</p>
            <p className="order-list-message">* {Words.sumMessage[lang]}</p>
        </>
    )
}