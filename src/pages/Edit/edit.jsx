import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";
import { toastify } from "../SignIn/signIn";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import styles from '../CreatTab/createTab.module.css';
import { apiEdit } from "../../api";
import { FormCreateEditTab } from "../../forms/FormCreateTab/formCreateEditTab";


export const Edit = () => {
    
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
        
    const initialValues = {
        documentName: '',
        companySignatureName: '',
        documentStatus: '',
        documentType: '',
        employeeNumber: '',
        employeeSignatureName: '',


        };
    const onSubmit = async (value, {resetForm}) => {

        const overObj = {
            companySigDate: new Date().toISOString(),
            employeeSigDate: new Date().toISOString()
        }
        value = {...value, ...overObj};
        const res = await apiEdit(value, token, params.editId)
        if(res.error_code === 0) {
            navigate('/');
            toastify('Данные изменены', toast.success)
            resetForm();
        }
        return;        
    }
    
    return (
        <>
        <div className={styles.wrapper}>
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