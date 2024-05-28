import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import styles from './signIn.module.css'
import { useMutation } from '@tanstack/react-query';
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FormRegAuth } from '../../forms/FormAuth/formAuth';

export const SignIn = () => {

    const navigate = useNavigate();

    const signInSchema = Yup.object().shape({
        username: Yup.string()
                     .required('Введите имя пользователя'),
        password: Yup.string()
                     .required('Введите пароль')
        });
        
    const initialValues = {
        username: '',
        password: '',
        };

    const {mutateAsync} = useMutation({
        mutationFn: async (values) => {
            const res = await fetch(`https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            }); 
            
            return res;
        }
    });

    const onSubmit = async (values) => {
        
        const toastify = (message, toastState) => {
            return toastState (message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
                });
        };
        
        const res = await mutateAsync(values);
        console.log(res);
        if (!res.ok) {
            return toastify('Что-то пошло не так, попробуйте позже', toast.warn);
        };
        
        const responce = await res.json();
        console.log(responce);
        if (responce.error_code !== 0) {
            return toastify('Неправильное имя пользователя или пароль', toast.warn);
        };
        localStorage.setItem('v5token', responce.data.token);
        toastify('Вы успешно авторизировались',toast.success);
        navigate('/');
       };

    return (
        <>
        <div className={styles.wrapper}>
            <h1>Войти</h1>
            <FormRegAuth
            typeForm={'auth'} 
            validationSchema={signInSchema} 
            onSubmit={onSubmit}
            initialValues={initialValues}
            />
        </div>
        </>
    )
}
