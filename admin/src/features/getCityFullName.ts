import type { NovaPostCities } from "../types/NovaPostCities.types";

export const getCityFullName = (city: NovaPostCities) => {
    return `${city.SettlementTypeDescription} ${city.Description} (${city.AreaDescription} область${city.RegionsDescription && ", " + city.RegionsDescription + " р-н"})`;
}