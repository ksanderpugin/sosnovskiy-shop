import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useLang } from "../../hooks/useLang";
import { Words } from "../../const/Words";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/strore";
import "./CheckOutForm.scss";
import { setOrder } from "../../store/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { getHref } from "../../features/getHref";
import { clearBasket } from "../../store/slices/basketSlice";
import { shops } from "../../const/Shops";
import { validateCheckoutForm } from "../../features/validateCheckOutForm";
import { CheckOutFormField } from "./CheckOutFormField";
import { CheckOutMeta } from "../../schimas/CheckOutSchema";
import { NovaPostFields } from "../NovaPostFields/NovaPostFields";

type DayItemType = {
    dayNumber: number;
    day: number;
    month: number;
    date: string;
}

export const CheckOutForm = () => {

    const lang = useLang() || 'uk';
    const basket = useSelector( (state:RootState) => state.basket.list );
    const dispatch = useDispatch<AppDispatch>();
    const pageNavigator = useNavigate();
    const [deliveryType, setDeliveryType] = useState('npo');
    const [days, setDays] = useState<DayItemType[]>([]);
    const [errors, setErrors] = useState< Record<string, string | false> >({});

    const dtOnChange = (type: string) => {
        if (deliveryType !== type) setDeliveryType(type);
    }

    const onBlurHandler = (et: HTMLInputElement) => {
        const data = new FormData();
        data.append(et.name, et.value);
        const [, errs] = validateCheckoutForm(data, et.name);
        setErrors({...errors, ...errs});
        if (Object.values(errs)[0] !== false) {
            et.focus();
            if (et.name === 'phone') {
                const index = et.value.search(/\d[^\d]*$/);
                et.setSelectionRange(index+1, index+1);
            } else et.setSelectionRange(et.value.length, et.value.length);
        }
    }

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const [sendData, errs] = validateCheckoutForm(data);
        setErrors(errs);
        for (const error of Object.values(errs)) {
            if (error !== false) return;
        }
        
        sendData.basket = JSON.stringify(basket);
        fetch(`${import.meta.env.VITE_BASE_URL}order`, {
            method: 'POST',
            body: JSON.stringify(sendData)
        })
        .then( resp => resp.json() )
        .then( data => {
            if (data.ok) {
                dispatch(setOrder(data.order));
                pageNavigator(getHref(lang, `/order/${data.order.number}`));
                dispatch(clearBasket());
            }
        });
    }

    const fetchDates = useCallback( () => {
        fetch(`${import.meta.env.VITE_BASE_URL}shippingDates`)
            .then( resp => resp.json() )
            .then( data => {
                if (data.ok) setDays(data.dates);
            })
            .catch( error => {
                console.log(`FETCH DATES ERROR: ${error}`);
                setTimeout( () => fetchDates(), 1000);
            });
    }, []);

    const getDateString = (dayNumber: number, day:number, month:number): string => {
        if (lang == 'en') 
            return `${Words.dayNames[lang][dayNumber]}, ${Words.monthNames[lang][month]} ${day}`;

        else
            return `${Words.dayNames[lang][dayNumber]}, ${day} ${Words.monthNames[lang][month]}`;
    }

    useEffect( () => {
        fetchDates()
    }, [fetchDates]);

    const getField = (schimaKey: 'firstName' | 'lastName' | 'city') => {
        return (
            <CheckOutFormField 
                key={CheckOutMeta[schimaKey].id}
                id={CheckOutMeta[schimaKey].id}
                label={CheckOutMeta[schimaKey].label[lang]}
                name={CheckOutMeta[schimaKey].name}
                require={CheckOutMeta[schimaKey].require}
                placeholder={CheckOutMeta[schimaKey].placeholder[lang]}
                error={errors[CheckOutMeta[schimaKey].name]}
                onBlur={onBlurHandler} />
        )
    }

    return (
        <div className="checkout-form">
            <form onSubmit={onSubmitHandler}>
                
                {[getField('firstName'), getField('lastName')]}
                
                <div className="checkout-form__item">
                    <label htmlFor="phone">{Words.phone[lang]}*</label>
                    <IMaskInput 
                        mask={'+38 (000) 000-00-00'}
                        onComplete={ () => {
                            document.getElementsByName('phone')[0].blur();
                        } }
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        onBlur={ e => onBlurHandler(e.target as HTMLInputElement)} 
                        lazy={false}
                    />
                    {errors.phone && <span>{errors.phone}</span>}
                </div>
                
                <div className="checkout-form__item">
                    <label htmlFor="contact-by">{CheckOutMeta.contactBy.label[lang]}</label>
                    <select name="contact-by" id="contact-by">
                        {CheckOutMeta.contactBy.options.map( item => 
                            <option key={item.value} value={item.value}>{item.title[lang]}</option>
                        )}
                    </select>
                </div>
                <div className="checkout-form__item">
                    <label htmlFor="delivery-type">{CheckOutMeta.deliveryBy.label[lang]}</label>
                    <select id="delivery-type" name="delivery-type" value={deliveryType} onChange={ e => dtOnChange(e.target.value) }>
                        {CheckOutMeta.deliveryBy.options.map( item => 
                            <option key={item.value} value={item.value}>{item.title[lang]}</option>
                        )}
                    </select>
                </div>

                {deliveryType.startsWith('np') && <NovaPostFields deliveryType={deliveryType} />}
                
                {deliveryType == 'pu' && 
                    <div className="checkout-form__item checkout-form__item--pp">
                        <label htmlFor="shop">{CheckOutMeta.pickUpPoint.label[lang]}</label>
                        <select id="shop" name="shop">
                            {shops.map( item => <option value={item.name} key={item.name}>{item.address[lang]}</option>)}
                        </select>
                    </div>}

                <div className="checkout-form__item checkout-form__item--day">
                    <label htmlFor="dispatch-date">
                        {deliveryType === 'pu' 
                            ? CheckOutMeta.pickupDay.label[lang] 
                            : CheckOutMeta.dispatchDate.label[lang]}
                    </label>
                    <select name="dispatch-date" id="dispatch-date">
                        {days.map( 
                            item => 
                                <option value={item.date} key={item.date}>
                                    {getDateString(item.dayNumber, item.day, item.month)}
                                </option>
                        )}
                    </select>
                </div>

                <div className="checkout-form__submit">
                    <button>{CheckOutMeta.submitTitle[lang]}</button>
                </div>
            </form>
        </div>
    )
}