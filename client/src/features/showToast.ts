import type { ReactNode } from "react";
import { toast } from "react-toastify";

export const showToast = (message: string | ReactNode, timeOut = 5000) => {
    toast(message, {
        style: {
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: 'var(--burgundy-color)',
            backdropFilter: 'blur(4px)',
            maxWidth: '80vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        progressClassName: "toast-progress",
        autoClose: timeOut
    });
}