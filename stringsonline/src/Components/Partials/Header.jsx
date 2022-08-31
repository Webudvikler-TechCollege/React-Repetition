import { Link } from 'react-router-dom'
import logo from '../../Assets/svg/Logo.svg'
import { BurgerMenu } from '../App/BurgerMenu/BurgerMenu'

// Function Component Header
export const Header = () => {
	return (
		<header>
			<span className="topnav_with_logo">
				<Link to={'/'}><img src={logo} alt="" /></Link>
				<span className="topnav_inner_wrapper">
					{/* Her skal toppens navbar ligge */}
					<Link to="/">Forside</Link>
					<Link to="/sales">Salgs- og handelsbetingelser</Link>
				</span>
			</span>
			<BurgerMenu />
		</header>
	)
}