import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { ProductItem } from "../components/index.tsx";
import { Provider } from "react-redux";
import { store } from "../store/strore.ts";
import { BrowserRouter } from "react-router-dom";

test("Product Item Test", () => {
    
    render(
        <BrowserRouter>
            <Provider store={store} >
                <ProductItem id={1} title="Products title" image="/media/img1.jpg" price={240} />
            </Provider>
        </BrowserRouter>
    );

    expect(screen.getByText("Products title")).toBeInTheDocument();
})