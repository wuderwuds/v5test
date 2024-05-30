import styles from '../FormAuth/formAuth.module.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';


export const FormCreateEditTab = ({validationSchema, onSubmit, initialValues, typeForm}) => {
       
    return (        
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
             <Form className={styles.wrapper} >
                
                <label htmlFor="documentName">documentName</label>
                <Field 
                    id="documentName" 
                    name="documentName"
                    type="text"
                />
                <ErrorMessage component={'p'} name='documentName'/>
                
                <label htmlFor="companySignatureName">companySignatureName</label>
                <Field 
                    id="companySignatureName" 
                    name="companySignatureName"
                    type="text"
                />
                <ErrorMessage component={'p'} name='companySignatureName'/>
                
                <label htmlFor="documentStatus">documentStatus</label>
                <Field 
                    id="documentStatus" 
                    name="documentStatus"
                    type="text"
                />
                <ErrorMessage component={'p'} name='documentStatus'/>
                
                <label htmlFor="documentType">documentType</label>
                <Field 
                    id="documentType" 
                    name="documentType"
                    type="text"
                />
                <ErrorMessage component={'p'} name='documentType'/>
                
                <label htmlFor="employeeNumber">employeeNumber</label>
                <Field 
                    id="employeeNumber" 
                    name="employeeNumber"
                    type="text"
                />
                <ErrorMessage component={'p'} name='employeeNumber'/>
               
                <label htmlFor="employeeSignatureName">employeeSignatureName</label>
                <Field 
                    id="employeeSignatureName" 
                    name="employeeSignatureName"
                    type="text"
                />
                <ErrorMessage component={'p'} name='employeeSignatureName'/>               
               
                <Button 
                    type = 'submit' 
                    sx={{ marginTop: 1 }}
                    variant="contained" 
                    color='success' 
                > {typeForm==='edit'? 'Изменить': 'Создать'}
                </Button>
            
            </Form>
        </Formik>
    )
}