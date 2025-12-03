import {useDebounce} from "../../hooks/useDebounce.ts";
import {type FormEvent, useEffect, useState} from "react";
import type {RSOptionItem} from "../../types/RSOptionItem.types.ts";
import Select from "react-select";
import "./NovaPostModal.scss";
import type {NovaPostCities} from "../../types/NovaPostCities.types.ts";
import {loadNovaPostCities} from "../../features/loadNovaPostCities.ts";
import {getCityFullName} from "../../features/getCityFullName.ts";
import {loadNovaPostOffices} from "../../features/loadNovaPostOffices.ts";
import type {NovaPostOffice} from "../../types/NovaPostOffice.types.ts";

type PropTypes = {
    entered: string;
    onAccept?: (data: Record<string, string>) => void;
}

export const NovaPostModal = ({entered, onAccept}: PropTypes) => {

    const [city, setCity] = useState<string>('');
    const [cityList, setCityList] = useState<NovaPostCities[]>([]);
    const [pointList, setPointList] = useState<RSOptionItem[]>([]);
    const searchCity = useDebounce(city, 500);

    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        const fd = new FormData(event.target as HTMLFormElement);
        const data: Record<string, string> = {};
        for (const [key, value] of fd.entries()) {
            data[key] = value.toString();
        }
        console.log(data);
        if (onAccept) {onAccept(data);}
    }

    useEffect( () => {
        console.log(`Search city: ${searchCity}`);
        if (searchCity.indexOf('(') > 0) return;
        loadNovaPostCities(
            searchCity,
            (cities: NovaPostCities[]) => {
                setCityList(cities);
            },
            (error) => {
                console.log(error);
            });
    }, [searchCity]);

    const selectCity = (index: number) => {
        console.log(cityList[index]);
        setCity(getCityFullName(cityList[index]));
        loadNovaPostOffices(
            cityList[index].Ref,
            (data: NovaPostOffice[]) => {
                setPointList(data.map( item => {
                    return {
                        value: item.WarehouseIndex + ' ' + item.Description,
                        label: item.Description
                    }
                }));
            },
            error => { console.log(error) }
        );
        setCityList([]);
    }

    return (
        <div className="np-modal-wrapper">
            <div className="np-modal">
                <form onSubmit={onSubmitHandler}>
                    <header className="np-modal-header"><span>Entered:</span>
                        {entered}
                    </header>
                    <div className="np-modal-content">
                        {
                            cityList.length > 0
                            &&
                            <div className="np-modal-content__city-list">
                                {cityList.map( (city, index) => {
                                    return (
                                        <p onClick={() => selectCity(index)}>
                                            {getCityFullName(city)}
                                        </p>
                                    )
                                })}
                            </div>
                        }
                        <p>
                            <span className="np-modal-content__label">City:</span>
                            <input name="city" type="text" value={city} onChange={(event) => setCity(event.target.value)} />
                        </p>
                        {
                            pointList.length > 0
                            &&
                            <p>
                                <span className="np-modal-content__label">Office or terminal:</span>
                                <Select options={pointList} name="address" />
                            </p>
                        }
                        <p>
                            <button className="np-modal-content__button">Accept</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}