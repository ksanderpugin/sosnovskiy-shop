import { useEffect, useMemo, useRef, useState } from "react";
import { Words } from "../../const/Words";
import { useLang } from "../../hooks/useLang";
import { CheckOutMeta } from "../../schimas/CheckOutSchema"
import { CheckOutFormField } from "../CheckOutForm/CheckOutFormField"
import Select, { type SelectInstance, type StylesConfig } from 'react-select';
import { useDebounce } from "../../hooks/useDebounce";
import { loadNovaPostCities } from "../../features/loadNovaPostCities";
import "./NovaPostFields.scss";
import type { NovaPostCities } from "../../types/NovaPostCities.types";
import { getCityFullName } from "../../features/getCityFullName";
import { transliterateEnToUa } from "../../features/transliterateEnToUa";
import { loadNovaPostOffices } from "../../features/loadNovaPostOffices";
import type { NovaPostOffice } from "../../types/NovaPostOffice.types";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/strore";

export const NovaPostFields = ({deliveryType}: {deliveryType: string}) => {

    const lang = useLang() || 'uk';
    const {city: defCity, address} = useSelector( (state: RootState) => state.user );
    const [city, setCity] = useState(defCity || '');
    const debounceCity = useDebounce(city, 500);
    const [cities, setCities] = useState<NovaPostCities[]>([]);
    const [selectedCity, setSelectedCity] = useState({ref: '', name: ''});
    const [offices, setOffices] = useState<NovaPostOffice[]>([]);
    const [citiesShown, setCitiesShown] = useState(false);

    const selectRef = useRef(null);

    const options = useMemo( () => {
        if (deliveryType === 'npo') 
            return offices
                .filter( item => !item.Description.startsWith("Поштомат"))
                .map( item => ({value: item.WarehouseIndex + '; ' + item.Description, label: item.Description}));
        else if (deliveryType === 'npp')
            return offices
                .filter( item => item.Description.startsWith("Поштомат"))
                .map( item => ({value: item.WarehouseIndex + '; ' + item.Description, label: item.Description}));
        return [];
    }, [deliveryType, offices]);

    const selectStyles: StylesConfig = {
        control: (styles, state) => ({ ...styles, 
            backgroundColor: state.isFocused ? 'rgba(255,255,255,0.7)' : 'transparent', 
            border: '1px solid var(--burgundy-color)',
            borderRadius: '.5em',
            boxShadow: state.isFocused ? '0 0 .2em var(--burgundy-color)' : 'none',
            '&:hover': {
                
            }
        }),
        input: (styles) => ({ ...styles, padding: '.27em', color: 'var(--burgundy-color)'}),
        dropdownIndicator: (styles) => ({ ...styles, 
            color: 'var(--burgundy-color)',
            '&:hover': {
                color: 'var(--burgundy-color)'
            }
        }),
        // indicatorSeparator: () => ({display: 'none'}),
        clearIndicator: (styles, state) => ({ ...styles, 
            color: 'var(--burgundy-color)',
            opacity: state.isFocused ? '0.5' : '0.2',
            transition: 'opacity .3s',
            '&:hover': {
                opacity: '0.5',
                color: 'var(--burgundy-color)'
            }
        }),
        menu: (styles) => ({ ...styles, zIndex: '3'}),
        option: (styles, state) => ({...styles, backgroundColor: state.isFocused ? 'rgba(55,4,1,0.1)' : 'transparent'})
    }

    useEffect( () => {
        let searchCity = debounceCity.trim();
        if (/\(/.test(searchCity)) return;
        if (lang !== 'en' && /^[a-zA-Z]+$/.test(searchCity)) return;
        if (/[^\p{L}\s\-']+/gu.test(searchCity)) return;
        if (searchCity.length > 2) {
            if (/^[a-zA-Z ]+$/.test(searchCity) && lang === 'en') searchCity = transliterateEnToUa(searchCity);
            loadNovaPostCities(
                searchCity, 
                (cities: NovaPostCities[]) => {
                    setCities(cities);
                }
            );
        } else {
            setCities([]);
        }
    }, [debounceCity, lang]);

    useEffect( () => {
        if (selectedCity.ref) loadNovaPostOffices(
            selectedCity.ref,
            (data: NovaPostOffice[]) => {
                setOffices(data);
            }
        );
    }, [selectedCity]);

    useEffect( () => {
        if (options.length && selectRef.current) {
            const inp = selectRef.current as SelectInstance;
            inp.focus();
            inp.clearValue();
        }
    }, [options]);

    const selectCityHandler = (el: HTMLParagraphElement) => {
        const ref = el.dataset.ref;
        const name = el.textContent;
        if (ref && name) {
            setOffices([]);
            setSelectedCity({ref, name});
            setCity(name);
            setCities([]);
        }
    }

    const clearCityHandler = () => {
        setOffices([]);
        setSelectedCity({ref:'', name:''});
        setCity('');
        setCities([]);
    }

    return (
        <>
            <div className="checkout-form__item" style={ {position: 'relative'} }>
                <label htmlFor={CheckOutMeta.city.id}>
                    {CheckOutMeta.city.label[lang]}
                </label>

                <input 
                    id={CheckOutMeta.city.id} 
                    type="text" 
                    placeholder={CheckOutMeta.city.placeholder[lang]} 
                    name={CheckOutMeta.city.name}
                    value={city}
                    onChange={e => setCity(e.target.value)} 
                    onFocus={() => {setCitiesShown(true)}}
                    onBlur={() => {setTimeout(() => setCitiesShown(false), 200)}}/>

                {cities.length > 0 && citiesShown && <div className="nova-post-cities" onClick={e => selectCityHandler(e.target as HTMLParagraphElement)}>
                    {cities.map( (item, index) => 
                        <p key={index} data-ref={item.Ref}>{getCityFullName(item, lang)}</p>
                    )}
                </div>}

                {city.length > 0 && <div className="nova-post-cities__clear-city" onClick={clearCityHandler}/>}
            </div>
            
            {deliveryType === 'npa' && <CheckOutFormField                
                id={CheckOutMeta.address.id}
                label={CheckOutMeta.address.label[lang]}
                name={CheckOutMeta.address.name}
                defaultValue={address}
                placeholder={CheckOutMeta.address.placeholder[lang]} />}

            {['npo', 'npp'].includes(deliveryType) && 
                <div className="checkout-form__item">
                    <label>
                        {deliveryType === 'npo' ? Words.npOffice[lang] : Words.npTerminal[lang]}
                    </label>
                    {options.length > 0 && <Select 
                        ref={selectRef}
                        name={deliveryType} 
                        options={options} 
                        styles={selectStyles} 
                        isSearchable 
                        isClearable
                        placeholder="" 
                        menuPlacement="top" />}
                    {options.length === 0 && <input 
                        name={deliveryType} 
                        type="text"
                        defaultValue={address} />}
                </div>}
        </>
    )
}