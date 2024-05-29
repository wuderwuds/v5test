import { useAuth } from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query";
import { TablesShow } from "../../components/TableShow/tableShow";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { apiAllTable } from "../../api";


export const Table = () => {
const {token} = useAuth();

const {data, isLoading, refetch} = useQuery({
    queryKey: ['tables'],
    queryFn: async () => {
        if(!token) return null;
        return await apiAllTable(token);
    }
});

if (isLoading) return (
        <div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
    );

    return (
    <>
    {data && <TablesShow refetch={refetch} data={data} token={token}/>}
    </>
    )

}