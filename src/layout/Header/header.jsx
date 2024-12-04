import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './header.module.css'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { cleanToken } from '../../redux/slices/tokenSlace';



export const Header = () => {

const token = useSelector(state=>state.token);
const dispatch = useDispatch();
const navigate = useNavigate();
    
    return (
    
        <header className={styles.header}>
            
            <div className={styles.headerMenu}>
                <li className={token ? '' : styles.lioff}>      
                    <Button 
                    onClick={()=>navigate('/v5test/create')} variant="contained"
                    > Добавить
                    </Button>
                </li>
            </div>
            
            <div className={styles.headerMenu}>
                <li className={ token ? '' : ''}> 
                    <NavLink 
                    className={({ isActive }) => isActive ? styles.header_b : styles.header_a}
                    to='/v5test'> Table 
                    </NavLink> 
                </li>

                <li className={token ? styles.lioff : ''}> 
                    <NavLink
                    className={({ isActive }) => isActive ? styles.header_b : styles.header_a}
                    to='/v5test/signin'> Sign in
                    </NavLink>
                </li>
                
                <li className={token ? '' : styles.lioff}> 
                    <Link
                    onClick={()=>dispatch(cleanToken())
                    }
                    className={styles.header_a}
                    to='/v5test/'
                    > Log out
                    </Link>
                </li>

            </div>         
        </header>
    )
}