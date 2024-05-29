import * as Yup from 'yup';
import styles from './createTab.module.css'
import { FormCreateEditTab } from '../../forms/FormCreateTab/formCreateEditTab';
import { apiCreateTab } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toastify } from '../SignIn/signIn';
import { toast } from 'react-toastify';

export const CreateTab = () => {
    const {token} = useAuth();
    const navigate = useNavigate()
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
        const res = await apiCreateTab(value, token)
        if(res.error_code === 0) {
            navigate('/');
            toastify('Успешно добавлен', toast.success)
            resetForm();
        }
        return;        
    }
    
    return (
        <>
        {token && <div className={styles.wrapper}>
            <h1>Добавить</h1>
            <FormCreateEditTab
            validationSchema={createTabSchema} 
            onSubmit={onSubmit}
            initialValues={initialValues}
            />
        </div>
        }
        </>
    )
}