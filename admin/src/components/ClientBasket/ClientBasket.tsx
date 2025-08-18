import type {BasketItem} from "../../types/Order.types.ts";
import {useCallback} from "react";
import "./ClientBasket.scss";
import type {ProductItemType} from "../../types/ProductItem.types.ts";

type PropTypes = {
    basket?: Record<string, BasketItem>;
    setBasket?: (basket: Record<string, BasketItem>) => void;
    products?: ProductItemType[]
}

export const ClientBasket = ({basket, setBasket, products}: PropTypes) => {

    const typeLiters = 'nЦПnУ';

    const changeBasketItem = useCallback( (key: string, operation: '-' | '+' | 'r') => {
        if (!basket || !setBasket) return;
        switch (operation) {
            case 'r':
                delete basket[key];
                setBasket(basket);
                break;

            case '+':
                basket[key].num++;
                setBasket(basket);
                break;

            case '-':
                if (basket[key].num === 0) return;
                basket[key].num--;
                setBasket(basket);
                break;
        }
    }, [basket, setBasket]);

    const getItem = useCallback( (key: string, num: number, price: number) => {
        const ids = key.split('_');
        const product = products && products.find( (product) => product.id === parseInt(ids[1]) );
        if (product) {
            return (<tr key={key} className="client-basket-item">
                <td>{product.nameUK}</td>
                <td className="num">{typeLiters.at(product.packs[+ids[2]].type)}</td>
                <td className="num">{product.packs[+ids[2]].weight}</td>
                <td className="num">{num}</td>
                <td className="num">{price}</td>
                <td className="num">{Math.round(product.packs[+ids[2]].weight * num * price / 1000)}</td>
                <td className="client-basket-item__edits">
                    <p>
                        <span onClick={() => {changeBasketItem(key, '+')}}>➕</span>
                        <span onClick={() => {changeBasketItem(key, '-')}}>➖</span>
                        <span onClick={() => {changeBasketItem(key, 'r')}}>🗑️</span>
                    </p>
                </td>
            </tr> )
        }
    }, [changeBasketItem, products]);

    if (!basket) return (<div>Empty basket</div>);


    return (
        <table className="client-basket">
            <thead>
            <tr>
                <th>Product</th>
                <th>Pack</th>
                <th>Weight</th>
                <th>Num</th>
                <th>Price</th>
                <th>Sum</th>
                <th></th>
            </tr>
            {Object.keys(basket).map( (key) => getItem(key, basket[key].num, basket[key].price) )}
            </thead>
        </table>
    )
}