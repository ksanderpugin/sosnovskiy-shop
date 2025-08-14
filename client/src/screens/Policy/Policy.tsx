import { useCallback, useEffect, useState } from "react"
import { Loader } from "../../components";
import parse from "html-react-parser";
import "./Policy.scss";


export const Policy = () => {

    const [html, setHtml] = useState('');

    const fetchPolicy = useCallback( () => {
        if (html.length < 1) 
            fetch(`${import.meta.env.VITE_BASE_URL}policy`)
                .then( resp => resp.json() )
                .then( data => {
                    setHtml(data.html)
                })
                .catch( () => {
                    setTimeout(fetchPolicy, 1000);
                });
    }, [html]);

    useEffect( () => {
        fetchPolicy();
    });

    if (html.length < 1) return (<Loader />);

    return (
        <section className="policy wrapper bigtext">
            {parse(html)}
        </section>
    )
}