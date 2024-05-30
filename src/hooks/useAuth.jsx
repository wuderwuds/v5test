import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { Zoom, toast } from "react-toastify";

export const useAuth = () => {
const token = useSelector(state=>state.token)
const navigate = useNavigate();
useEffect(() => {
if (!token) {
  navigate('/v5test/signin');
  toast.warn('Пожалуйста авторизируйтесь', {
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
}
}, [navigate, token])

  return {token}
}