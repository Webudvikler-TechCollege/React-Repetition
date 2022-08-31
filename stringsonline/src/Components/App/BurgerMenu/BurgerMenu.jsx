import { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './BurgerMenu.module.scss';

export function BurgerMenu() {

    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    }

    return (
        <>
            <div className={isActive ? Style.burgerMenuActive : Style.burgerMenu} onClick={handleToggle}>
                <div className={Style.burgerMenuLine}></div>
                <div className={Style.burgerMenuLine}></div>
                <div className={Style.burgerMenuLine}></div>
            </div>

            <ul className={isActive ? Style.activeMenu : Style.menu}>
                <li><Link className={Style.navigationLinks} to="/" onClick={handleToggle}>Forside</Link></li>
                <li><Link className={Style.navigationLinks} to="/Products" onClick={handleToggle}>Produkter</Link></li>
            </ul>
        </>
    )
}