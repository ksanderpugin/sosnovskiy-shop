import { Words } from "../const/Words";
import type { Lang } from "../types/Lang";
import { showToast } from "./showToast";

export const showAcceptOrderMes = (mes: string, lang: Lang) => {
    
    const node = (
        <div style={ {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'} }>
            <div className="check-order animate" aria-label="Success">
            <svg viewBox="0 0 64 64" role="img" aria-hidden="true" focusable="false">
                <circle className="check-order__circle" cx="32" cy="32" r="28" pathLength="100" />
                <path className="check-order__mark" d="M20 34 L28 42 L46 24" pathLength="100" />
            </svg>
            </div>
            <h2 style={ {fontSize: 'var(--fs-m)', margin: '1em 0'} }>{Words.shopThanks[lang]}</h2>
            <p style={ {paddingBottom: '1em', textAlign: 'justify'} }>{mes}</p>
        </div>);

    showToast(node, 7000);
}