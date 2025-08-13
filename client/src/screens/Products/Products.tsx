import { CategoryList, ProductList } from "../../components";
import { useLang } from "../../hooks/useLang";
import { NotFound404 } from "../NotFound404/NotFound404";
import "./Products.scss";

export const Products = () => {

    const lang = useLang();

    if (!lang) return (<NotFound404 />)

    return (
        <section className="products wrapper">
            <CategoryList />
            <ProductList />
        </section>
    );
}