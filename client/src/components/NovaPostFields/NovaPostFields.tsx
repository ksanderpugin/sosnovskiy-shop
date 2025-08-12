import { useEffect, useMemo, useState } from "react";
import { Words } from "../../const/Words";
import { useLang } from "../../hooks/useLang";
import { CheckOutSchema } from "../../schimas/CheckOutSchema"
import { CheckOutFormField } from "../CheckOutForm/CheckOutFormField"
import Select, { type StylesConfig } from 'react-select';
import { useDebounce } from "../../hooks/useDebounce";
import { loadNovaPostCities } from "../../features/loadNovaPostCities";
import "./NovaPostFields.scss";
import type { NovaPostCities } from "../../types/NovaPostCities.types";
import { getCityFullName } from "../../features/getCityFullName";
import { transliterateEnToUa } from "../../features/transliterateEnToUa";
import { loadNovaPostOffices } from "../../features/loadNovaPostOffices";
import type { NovaPostOffice } from "../../types/NovaPostOffice.types";

export const NovaPostFields = ({deliveryType}: {deliveryType: string}) => {

    const lang = useLang() || 'uk';
    const [city, setCity] = useState('');
    const debounceCity = useDebounce(city, 500);
    const [cities, setCities] = useState<NovaPostCities[]>([]);
    const [selectedCity, setSelectedCity] = useState({ref: '', name: ''});
    const [offices, setOffices] = useState<NovaPostOffice[]>([]);
    const [citiesShown, setCitiesShown] = useState(false);

    const options = useMemo( () => {
        if (deliveryType === 'npo') 
            return offices
                .filter( item => item.Description.startsWith("Відділення") || item.Description.startsWith("Пункт"))
                .map( item => ({value: item.WarehouseIndex + '; ' + item.Description, label: item.Description}));
        else 
            return offices
                .filter( item => item.Description.startsWith("Поштомат"))
                .map( item => ({value: item.WarehouseIndex + '; ' + item.Description, label: item.Description}));

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
        option: (styles, state) => ({...styles, backgroundColor: state.isFocused ? 'rgba(55,4,1,0.1)' : 'transparent'})
    }

    useEffect( () => {
        let searchCity = debounceCity.trim();
        if (/\(/.test(searchCity)) return;
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

    return (
        <>
            <div className="checkout-form__item" style={ {position: 'relative'} }>
                <label htmlFor={CheckOutSchema.city.id}>
                    {CheckOutSchema.city.label[lang]}
                </label>

                <input 
                    id={CheckOutSchema.city.id} 
                    type="text" 
                    placeholder={CheckOutSchema.city.placeholder[lang]} 
                    name={CheckOutSchema.city.name}
                    value={city}
                    onChange={e => setCity(e.target.value)} 
                    onFocus={() => {setCitiesShown(true)}}
                    onBlur={() => {setCitiesShown(false)}}/>

                {cities.length > 0 && citiesShown && <div className="nova-post-cities" onClick={e => selectCityHandler(e.target as HTMLParagraphElement)}>
                    {cities.map( (item, index) => 
                        <p key={index} data-ref={item.Ref}>{getCityFullName(item, lang)}</p>
                    )}
                </div>}
            </div>
            
            {deliveryType === 'npa' && <CheckOutFormField                
                id={CheckOutSchema.address.id}
                label={CheckOutSchema.address.label[lang]}
                name={CheckOutSchema.address.name}
                placeholder={CheckOutSchema.address.placeholder[lang]} />}

            {['npo', 'npp'].includes(deliveryType) && 
                <div className="checkout-form__item">
                    <label>
                        {deliveryType === 'npo' ? Words.npOffice[lang] : Words.npTerminal[lang]}
                    </label>
                    {options.length > 0 && <Select 
                        name={deliveryType} 
                        options={options} 
                        styles={selectStyles} 
                        isSearchable 
                        isClearable
                        placeholder="" 
                        menuPlacement="top" />}
                    {options.length === 0 && <input 
                        name={deliveryType} 
                        type="text" />}
                </div>}
        </>
    )
}