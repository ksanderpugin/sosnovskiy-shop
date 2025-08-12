export const validateCheckoutForm = (data: FormData, keyOnly: string | false = false) => {
    
    const errors: Record<string, string | false> = keyOnly ? {} : {
        'first-name': false,
        'last-name': false,
        'phone': false
    };
    if (keyOnly) errors[keyOnly] = false;
    const rData: Record<string, string> = {};

    const testField = (name: string, value: string) => {
        switch(name) {
            case 'first-name':
                if (value.length < 3) errors[name] = 'First name cannot be shorter than 3 characters!';
                break;

            case 'last-name':
                if (value.length < 3) errors[name] = 'Last name cannot be shorter than 3 characters!';
                break;

            case "phone":
                // eslint-disable-next-line no-case-declarations
                const pRE = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/gm;
                if (!pRE.test(value)) errors[name] = 'Enter valid phone number!';
                break;
        }
    }

    for (const [key, formValue] of data.entries()) {
        const value = formValue.toString().trim();
        if (!keyOnly || key == keyOnly) testField(key, value);
        rData[key] = value;
    }

    return [rData, errors];
}