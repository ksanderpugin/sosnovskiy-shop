import type { ReactNode } from "react";
import "./CheckBox.scss";

type PropTypes = {
    name: string;
    checked?: boolean;
    children?: string | ReactNode;
}

export const CheckBox = ({name, checked = false, children}: PropTypes) => (
    <label className="checkbox-wrapper">
        <input type="checkbox" defaultChecked={checked} name={name} />
        <span className="checkbox-icon">
            <u>
                <svg viewBox="0 0 512 512" version="1.1">
                    <path d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z"/>
                </svg>
            </u>
        </span>
        <span className="checkbox-title">
            {children}
        </span>
    </label>
)