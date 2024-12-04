import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import styles from './signIn.module.css'
import { useMutation } from '@tanstack/react-query';
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FormRegAuth } from '../../forms/FormAuth/formAuth';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/tokenSlace';
import { useNoAuth } from '../../hooks/useNoAuth';

export const toastify = (message, toastState) => {
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

export const SignIn = () => {
    const {token} = useNoAuth();
    const dispatch = useDispatch();

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

        const res = await mutateAsync(values);
        if (!res.ok) {
            return toastify('Что-то пошло не так, попробуйте позже', toast.warn);
        };
        
        const responce = await res.json();
        if (responce.error_code === 0) {
            dispatch(setToken(responce.data.token));
            navigate('/v5test');
            return toastify('Вы успешно авторизировались',toast.success);
                     
        };
        return toastify('Неправильное имя пользователя или пароль', toast.warn);
       };

    return (
        <>
        {!token && <div className={styles.wrapper}>
            <h1>Войти</h1>
            <FormRegAuth
            validationSchema={signInSchema} 
            onSubmit={onSubmit}
            initialValues={initialValues}
            />
        </div>
        }
        </>
    )
}
