import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const NavBarLeft = () => {
	const [ parentGroups, setParentGroups ] = useState([]);
	const [ subGroups, setSubGroups ] = useState([]);
	const [ curId, setCurId ] = useState(0)

	useEffect(() => {
		const getData = async () => {
			const result = await axios.get('https://api.mediehuset.net/stringsonline/groups')
			setParentGroups(result.data.items)
		}
		getData()
	}, [setParentGroups])

	const getSubmenu = async group_id => {
		const result = await axios.get(`https://api.mediehuset.net/stringsonline/groups/${group_id}`)
		setCurId(group_id)
		setSubGroups(result.data.items.subgroups);
	}

	return (
		<ul>
			{parentGroups && parentGroups.map(group => {
				return (
					<li key={group.id}>
						<Link to={'./'} onClick={() => getSubmenu(group.id)} title={group.description}>{group.title}</Link>
						{group.id === curId && (
							<ul>
								{subGroups && subGroups.map(subgroup => {
									return (
										<li key={subgroup.id}>
											<Link to={`/products/${subgroup.id}`}>{subgroup.title}</Link>
										</li>
									)
								})}
							</ul>
						)}
					</li>
				)
			})}
		</ul>
	)
}