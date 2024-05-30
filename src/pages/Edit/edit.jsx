import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";
import { toastify } from "../SignIn/signIn";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import styles from '../CreatTab/createTab.module.css';
import { apiEdit } from "../../api";
import { FormCreateEditTab } from "../../forms/FormCreateTab/formCreateEditTab";
import { useSelector } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';


export const Edit = () => {
    const data = useSelector(state=>state.data);    
    const params = useParams();
    const {token} = useAuth();
    const navigate = useNavigate();
    const textRequired = () => {
        return 'Обязательно'
    };
    
    const createTabSchema = Yup.object().shape({
        documentName: Yup.string()
                         .required(textRequired()),
        companySignatureName: Yup.string()
                                 .required(textRequired()),
        documentStatus: Yup.string()
                           .required(textRequired()),
        documentType: Yup.string()
                         .required(textRequired()),
        employeeNumber: Yup.string()
                           .required(textRequired()),
        employeeSignatureName: Yup.string()
                           .required(textRequired())
        });

    const initialValues = data.find(el=>el.id===params.editId);

    const onSubmit = async (value, {resetForm}) => {

        const overObj = {
            companySigDate: new Date().toISOString(),
            employeeSigDate: new Date().toISOString()
        }
        value = {...value, ...overObj};
        delete value.id;
        const res = await apiEdit(value, token, params.editId)
        if(res.error_code === 0) {
            navigate('/v5test');
            toastify('Успех', toast.success);
            resetForm();
        }
        return;        
    }
    
    return (
        <>
        <div className={styles.wrapper}>
            <IconButton onClick={()=>navigate(-1)}>
            <ArrowBackIcon/>
            </IconButton>
            <h1>Изменить</h1>
            <FormCreateEditTab
            validationSchema={createTabSchema} 
            onSubmit={onSubmit}
            initialValues={initialValues}
            typeForm={'edit'}
            />
        </div>
        </>
    )
}