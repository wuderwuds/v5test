import styles from './formAuth.module.css' 
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';

export const FormRegAuth = ({validationSchema, onSubmit, initialValues}) => {
   
    
    return (        
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
             <Form className={styles.wrapper} >
                
                <label htmlFor="username">Login</label>
                <Field 
                    id="username" 
                    name="username"
                    type="text"
                />
                <ErrorMessage component={'p'} name='username'/>
                
                <label htmlFor="password">Password</label>
                <Field 
                    id="password" 
                    name="password" 
                    placeholder="password" 
                    type='password' 
                />
                <ErrorMessage component={'p'} name='password'/>
                
                <Button 
                    type = 'submit' 
                    sx={{ marginTop: 1 }}
                    variant="contained" 
                    color='success' 
                > Войти
                </Button>
            
            </Form>
        </Formik>
    )
}