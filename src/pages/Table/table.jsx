import { useEffect } from "react"
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useAuth } from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query";
import { TablesShow } from "../../components/TableShow/tableShow";

export const Table = () => {
const {token} = useAuth();

useEffect(()=>{
    if (!token)  toast.warn('Пройдите авторизацию', {
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
    
},[token]);

const {data} = useQuery({
    queryKey: ['tables'],
    queryFn: async () => {
        try {
            const res = await fetch(`https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get`, {
                headers: {
                    'x-auth':token,
                }
            }); 
            const responce = await res.json();
            if (res.status===200) {
                console.log(responce.data);
                return responce.data;
            }

        return alert(responce.message)
        } catch (error) {
            return alert(error)
        }
    }, 
})

    return (
    <>
   
        {data && <TablesShow data={data}/>
        }
    
    </>
    )

}