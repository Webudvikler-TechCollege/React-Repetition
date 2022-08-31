import { Link } from 'react-router-dom'
import logo from '../../Assets/svg/Logo.svg'
import { BurgerMenu } from '../App/BurgerMenu/BurgerMenu'

// Function Component Header
export const Header = () => {
	return (
		<header>
			<span className="nav_with_logo">
				<img src={logo} alt="" />
				<span className="nav_inner_wrapper">
					<Link to="/">Forside</Link>
					<Link to="/sales">Salgs- og handelsbetingelser</Link>
				</span>
			</span>
			<BurgerMenu />
		</header>
	)
}