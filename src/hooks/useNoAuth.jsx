import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export const useNoAuth = () => {
const  token = useSelector(state=>state.token)
const navigate = useNavigate();
useEffect(() => {
if (token) navigate('/')
}, [navigate, token])

  return {token}
}