import { NavLink } from "react-router-dom"

/**
 * Function Component NavBar
 * Anvender navlink til links i navigationen
 * Sætter automatisk class active på valgt link
 * @returns html string
 */
export const NavBar = () => {
	return (
		<nav>
			<ul>
				<li><NavLink to="/" >Forside</NavLink></li>
				<li><NavLink to="/search">Søg</NavLink></li>
				<li><NavLink to="/products">Produkter</NavLink></li>
				<li><NavLink to="/login">Login</NavLink></li>
				<li><NavLink to="/extranet">Ekstranet</NavLink></li>
			</ul>
		</nav>
	)
}