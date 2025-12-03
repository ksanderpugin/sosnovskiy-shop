import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import type {BasketItem, OrderType} from "../../types/Order.types.ts";
import {type ReactNode, useEffect, useRef} from "react";
import type {ProductItemType} from "../../types/ProductItem.types.ts";
import "./PackOrderDialog.scss";
import {PackNames} from "../../constants/PackNames.const.ts";
import type {TBill} from "../../types/TBill.types.ts";

type PropType = {
    order: OrderType;
    onBackClick?: () => void;
    onCompleted?: () => void;
}

const createBasketFragment = (basket: Record<string, BasketItem>, products: ProductItemType[]) => {
    const fragment: ReactNode[] = [];

    Object.keys(basket).forEach(key => {
        const kd = key.split('_');
        if (kd.length > 2) {
            const posId = +kd[1];
            const packIndex = +kd[2];
            const product = products.find( el => el.id === posId);
            if (product) {
                for (let i=0; i<basket[key].num; i++) {
                    fragment.push(<tr key={`${key}_${i}`}>
                        <td>{product.nameRU}</td>
                        <td>{PackNames.ru[product.packs[packIndex].type]}</td>
                        <td>
                            <input
                                data-position={product.id}
                                data-price={basket[key].price}
                                data-pack={packIndex}
                                data-number={i}
                                className="bill-item-input"
                                placeholder="0.000"
                            />
                        </td>
                    </tr>);
                }
            } else fragment.push(<tr><td colSpan={3}>Bad product index {posId}, key: {key}</td></tr>)
        } else fragment.push(<tr><td colSpan={3}>Bad basket key: {key}</td></tr>)
    });

    return fragment;
}

export const PackOrderDialog = ({order, onBackClick, onCompleted}: PropType) => {

    const products = useSelector((state: RootState) => state.products.list);

    const ref = useRef<HTMLTableElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.querySelectorAll('input').forEach( el => {
                el.onfocus = () => {
                    el.parentElement!.parentElement!.style.backgroundColor = '#cfc';
                }
                el.onblur = () => {
                    el.parentElement!.parentElement!.removeAttribute('style');
                    if (ref.current) {
                        const all = [...ref.current.querySelectorAll('input')].reduce( (acc, prev) => {
                            return !!prev.value.length && acc;
                        }, true);
                        const completeBtn = document.querySelector('.pack-dialog__complete') as HTMLDivElement;
                        if (completeBtn) {
                            completeBtn.dataset.shown = all.toString();
                        }
                    }
                }
                el.onkeydown = (e) => {
                    if (e.key === 'Enter') {
                        el.blur();
                        return;
                    }
                    const reg = /[^0-9.,]/;
                    if (reg.test(e.key) && e.key.length < 2) {
                        e.preventDefault();
                        return;
                    }
                    if (e.key == '.' || e.key == ',') {
                        e.preventDefault();
                        const val = el.value;
                        if (val.indexOf('.') < 0) {
                            el.value += '.';
                            el.setSelectionRange(val.length+1, val.length+1);
                        }
                    }
                }
            });
            ref.current.querySelectorAll('tr').forEach(el => {
                el.onclick = () => {
                    const input = el.querySelector('input');
                    if (input) {
                        input.focus();
                        const l = input.value.length;
                        input.setSelectionRange(l, l);
                    }
                }
            })
        }
    }, [ref]);

    const onCompletedHandler = () => {
        if (ref.current) {
            const bill: TBill = {
                products: [],
                total: 0
            };
            ref.current.querySelectorAll('input').forEach( el => {
                const id = parseInt(el.dataset.position || '');
                const price = parseFloat(el.dataset.price || '');
                const weight = parseFloat(el.value);
                if (id && price && weight) {
                    const amount = Math.round(price*weight*100)
                    bill.products.push({id, price, weight, amount});
                    bill.total += amount;
                }
            });
            console.log(bill);
            if (onCompleted) onCompleted();
        }
    }

    return (
        <div className="pack-dialog">
            <aside>
                <div>
                    <button onClick={onBackClick}>&larr;</button>
                </div>
                <p>Заказ №{order.id}</p>
                <p>{order.clientName}</p>
                <p>{order.deliveryData.city}</p>
                <p>{order.deliveryData.address}</p>
            </aside>
            <main>
                <table ref={ref}>
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Тип Упаковки</th>
                        <th>Вес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {createBasketFragment(order.basket, products)}
                    </tbody>
                </table>
                <div className="pack-dialog__complete" data-shown="false">
                    <button onClick={onCompletedHandler}>Завершить</button>
                </div>
            </main>
        </div>
    )
}