import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import {setUser} from "../../store/slices/userSlice.ts";
import { toast } from "react-toastify"
import { Form } from "../../components/Form/Form"
import { AuthMeta, AuthSchema } from "../../schemas/AuthSchema"
import "./AuthScreen.scss"
import {useEffect} from "react";

export const AuthScreen = () => {

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (data: Record<string, unknown>, reset?: ( () => void | undefined)) => {
        return fetch(`${import.meta.env.VITE_BASE_URL}login`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then( resp => resp.json() )
        .then( data => {
            if (data.ok) {
                if (reset) reset();
                dispatch(setUser(data.user));
            }
            else {
                toast.error(data.error);
            }
        })
        .catch( () => {
            toast.error('Internet connect error. Try again later.')
        });
    }

    useEffect(() => {
    });

    return (
        <div className="auth-form">
            <h1 className="auth-form__title">Login to your account</h1>
            <Form schema={AuthSchema} meta={AuthMeta} onSubmitHandler={onSubmit} buttonTitle="Login" />
        </div>
    )
}