import {GoogleMap, InfoWindow, LoadScript, Marker} from "@react-google-maps/api";
import { shops } from "../../const/Shops";
import {useState} from "react";
import {useLang} from "../../hooks/useLang.ts";

const center = {
    lat: 50.50,
    lng: 30.55
};



export const ShopMap = () => {

    const lang = useLang() || 'uk';
    const [selectedShop, setSelectedShops] = useState<typeof shops[0] | undefined>(undefined);

    const onClickHandler = (id: number) => {
        const shop = shops.find(shop => shop.id === id);
        setSelectedShops(shop);
    }

    return (
        <LoadScript googleMapsApiKey={`${import.meta.env.VITE_GOOGLEMAP_KEY}`}>
            <GoogleMap mapContainerClassName="contacts-info__map-contanier" center={center} zoom={11}>
                {shops.map( item =>
                    <Marker
                        key={item.id}
                        position={item.position}
                        label={ {text: item.id.toString()} }
                        onClick={ () => onClickHandler(item.id)}/>
                )}
                {selectedShop &&
                    <InfoWindow
                        position={ {lat: selectedShop.position.lat, lng: selectedShop.position.lng } }
                        onCloseClick={ () => {setSelectedShops(undefined)}}>
                        <div>
                            <p>{selectedShop.address[lang]}</p>
                        </div>
                </InfoWindow>}
            </GoogleMap>
        </LoadScript>
    );
};