type PropTypes = {
    id: string;
    label: string;
    name: string;
    require?: boolean;
    placeholder?: string;
    error?: string | false;
    onBlur?: (el: HTMLInputElement) => void;
}

export const CheckOutFormField = ({id, label, name, require, placeholder, error, onBlur}: PropTypes) => (
    <div className="checkout-form__item">
        <label htmlFor={id}>{label}{require ? '*' : ''}</label>
        <input 
            id={id} 
            type="text" 
            placeholder={placeholder} 
            name={name} 
            onBlur={ e => onBlur && onBlur(e.target as HTMLInputElement) } />
        {error && <span>{error}</span>}
    </div>
);