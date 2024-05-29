import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './header.module.css'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '@mui/material';



export const Header = () => {

const {token} = useAuth();
const navigate = useNavigate();
    return (
    
        <header className={styles.header}> 
            <Button onClick={()=>navigate('/create')} variant="contained">Добавить</Button>
            <div className={styles.headerMenu}>
                <li className={ token ? '' : ''}> 
                    <NavLink 
                    className={({ isActive }) => isActive ? styles.header_b : styles.header_a}
                    to='/'> Table 
                    </NavLink> 
                </li>

        
                <li className={token ? styles.lioff : ''}> 
                    <NavLink
                    className={({ isActive }) => isActive ? styles.header_b : styles.header_a}
                    to='/signin'> Sign in
                    </NavLink>
                </li>
                
                <li className={token ? '' : styles.lioff}> 
                    <Link
                    onClick={()=>
                        localStorage.removeItem('v5token')
                        
                    }
                    className={styles.header_a}
                    to='/signin'> Log out
                    </Link>
                </li>


            </div>         
        </header>
    )
}