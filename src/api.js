import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const URL = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs';

const url_DTO = (hand, id=null) => {
    if(id) return `${URL}/${hand}/${id}`
    return `${URL}/${hand}`
};

const requestApi = async (url, method, token,data=null) => {
    const headers = {'x-auth':token};
    let body;
    if(data) {
        headers['Content-type'] = 'application/json';
        body = JSON.stringify(data);
    }
    const res = await fetch(url, {
        method,
        headers,
        body
    })
    if(res.status !==200) {
        return Promise.reject(res)
    }
    return res
};

const toastError = () => {
    return toast.warn('Что-то пошло не так, попробуйте позже', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
        })
}
export const apiDeleteTable = async(id, token, callback) => {
    try {
        const res = await requestApi(url_DTO('delete', id), 'POST', token);
        const responce = await res.json();
        if(responce.error_code===0) return callback();
        return toastError();
    } catch (error) {
        toastError();
    }
};
