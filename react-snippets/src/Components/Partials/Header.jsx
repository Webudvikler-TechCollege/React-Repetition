import { BurgerMenu } from '../App/BurgerMenu/BurgerMenu'
import { NavBar } from './NavBar'

// Function Component Header
export const Header = () => {
	return (
		<header>
			<span className="topnav_with_logo">
				<span className="topnav_inner_wrapper">
					{/* Her skal toppens navbar ligge */}
					<NavBar />
				</span>
			</span>
			<BurgerMenu />
		</header>
	)
}