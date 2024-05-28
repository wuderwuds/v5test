import { ToastContainer } from "react-toastify"
import { Header } from "./Header/header"
import {Outlet} from 'react-router-dom'
import styles from './index.module.css'
export const Layout = () => {
    return (
    <>
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.wrapper1}>
                <Outlet/> 
            </div>
        </div>
        <ToastContainer limit={1}/>
    </>
    )
}