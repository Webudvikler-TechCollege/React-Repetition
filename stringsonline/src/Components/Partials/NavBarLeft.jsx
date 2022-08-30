import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from 'axios'

export const NavBarLeft = () => {
	const [ parentGroups, setParentGroups ] = useState([])
	const [ curId, setCurId ] = useState()
	const [ subGroups, setSubGroups ] = useState([])

	useEffect(() => {
		const getData = async () => {
			const result = await axios.get('https://api.mediehuset.net/stringsonline/')
			setParentGroups(result.data.productgroups.items)
		}
		getData()
	}, [setParentGroups])

	const getSubMenu = async group_id => {
		const result = await axios.get(`https://api.mediehuset.net/stringsonline/groups/${group_id}`)
		setSubGroups(result.data.items.subgroups)
		setCurId(group_id)
	}

	return (
		<nav>
			<ul>	
				{parentGroups && parentGroups.map(item => {
					return (
						<li key={item.id}>
							<Link to={'./'} onClick={() => getSubMenu(item.id)}>
								{item.title}</Link>
								{item.id === curId ? (
								<ul>
									{subGroups && subGroups.map(subgroup => {
										return (
											<li key={subgroup.id}>
												<Link to={'./'}>{subgroup.title}</Link></li>
										)
									})}
								</ul>
							) : null
							}
						</li>
					)
				})}
			</ul>
		</nav>
	)
}