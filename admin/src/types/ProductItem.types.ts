import type { ProductPackType } from "./ProductPack.types";

export type ProductItemType = {
    id: number;
    iconLink: string;
    nameUK: string;
    nameEN: string;
    nameRU: string;
    ingredientsUK: string;
    ingredientsEN: string;
    ingredientsRU: string;
    packs: ProductPackType[];
    cal: number;
    fat: number;
    protein: number;
}