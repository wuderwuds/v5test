import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
const  token = localStorage.getItem('v5token');
const navigate = useNavigate();
useEffect(() => {
if (!token) navigate('/signin')
}, [navigate, token])

  return {token}
}