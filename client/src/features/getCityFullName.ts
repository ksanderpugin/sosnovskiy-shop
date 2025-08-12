import type { Lang } from "../types/Lang";
import type { NovaPostCities } from "../types/NovaPostCities.types";

export const getCityFullName = (city: NovaPostCities, lang: Lang) => {
    switch (lang) {
        case 'uk':
            return `${city.SettlementTypeDescription} ${city.Description} (${city.AreaDescription} область${city.RegionsDescription && ", " + city.RegionsDescription + " р-н"})`;
        
        case 'ru':
            return `${city.SettlementTypeDescriptionRu} ${city.DescriptionRu} (${city.AreaDescriptionRu}${city.RegionsDescriptionRu && ", " + city.RegionsDescriptionRu})`;

        case 'en':
            return `${city.SettlementTypeDescriptionTranslit} ${city.DescriptionTranslit} (${city.AreaDescriptionTranslit}${city.RegionsDescriptionTranslit && ", " + city.RegionsDescriptionTranslit})`;
    }
}