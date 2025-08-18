import type {ReactNode} from "react";
import {toast} from "react-toastify";

export const showModalToast = (message: string | ReactNode) => {
    toast(message, {
        position: "top-center",
        autoClose: false,
        style: {
            width: "auto"
        }
    })
}