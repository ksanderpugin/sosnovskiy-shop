import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {loadOrder} from "../../features/loadOrder.ts";
import {toast} from "react-toastify";
import type {BasketItem, OrderType} from "../../types/Order.types.ts";
import {OrderInfo} from "../../components/OrderInfo/OrderInfo.tsx";
import {ClientBasket} from "../../components/ClientBasket/ClientBasket.tsx";
import {OrderOptions} from "../../components/OrderOptions/OrderOptions.tsx";
import {showModalToast} from "../../features/showModalToast.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import Select from "react-select";
import {sendUpdatedOrder} from "../../features/sendUpdatedOrder.ts";
import {logout} from "../../store/slices/userSlice.ts";

export const Order = () => {

    const number = useParams().number;

    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<OrderType | undefined>(undefined);
    const products = useSelector((state: RootState) => state.products.list);

    const dispatch = useDispatch<AppDispatch>();

    useEffect( () => {
        if (number) {
            setLoading(true);
            loadOrder(number)
                .then( order => {
                    setOrder(order);
                    setLoading(false);
                })
                .catch( error => {
                    toast.error(error);
                    setLoading(false);
                });
        }
    }, [number]);

    const positionOptions = useMemo( () => {
        const options: {value: string, label: string}[] = [];
        const pts = 'nЦПnУ';
        products.forEach((product) => {
            product.packs.forEach( ( pack, index ) => {
                const item = {
                    value: `pos_${product.id}_${index}:${pack.cost}`,
                    label: `${product.nameUK} ${pts.at(pack.type)} ${pack.weight}g`
                }
                options.push( item );
            })
        });
        return options;
    }, [products]);

    const setBasket = (basket: Record<string, BasketItem>) => {
        if (order) setOrder({...order, basket})
    }

    const updateOrderInfo = (info: Record<string, string>) => {
        if (order) setOrder({...order, ...info});
    }

    const addPositionToBasket = (data: string | null) => {
        if (data && order) {
            const kp = data.split(':');
            const newItem: Record<string, BasketItem> = {}
            newItem[`${kp[0]}`] = {num: 1, price: +kp[1]}

            const newBasket = {...order.basket, ...newItem}
            setBasket(newBasket);
            toast.dismiss();
        }
    }

    const showAddPositionToast = () => {
        showModalToast(<div>
            <Select options={positionOptions} styles={ {
                container: (styles) => ( {
                    ...styles,
                    width: '70vw'
                })
            }} onChange={ val => addPositionToBasket(val && val.value)} />
        </div>);
    }

    const updateOrder = (state: number) => {
        if (order) sendUpdatedOrder({...order, state})
            .then( order => {
                console.log(order);
                history.back();
            })
            .catch( error => {
                if (error === 'need login') dispatch(logout());
                else toast.error(error);
            })
    }

    if (!number) return (<h1>Oops, bad order link</h1>);

    if (loading) return <div className="loader-wrapper"><div className="loader"></div></div>;

    return (
        <div className="order">
            <OrderInfo order={order} updateOrderInfo={updateOrderInfo} />
            <ClientBasket basket={order?.basket} setBasket={setBasket} products={products} />
            <OrderOptions
                addPositionHandler={showAddPositionToast}
                postponeOrder={() => {updateOrder(0)}}
                confirmOrder={() => updateOrder(2)}
            />
        </div>
    );
}