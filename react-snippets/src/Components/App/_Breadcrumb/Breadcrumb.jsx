import { useEffect, useState } from "react"
import Style from './Breadcrumb.module.scss'

export const Breadcrumb = () => {
	const [ crumbs, setCrumbs ] = useState(['Forside', 'Produkter'])

	useEffect(() => {
		console.log(crumbs);
	}, [crumbs])

	return (
		<ul className={Style.breadcrumb}>
			{crumbs.map((crumb, key) => {
				return (
					<li key={key}>{crumb}</li>
				)
			})}
		</ul>
	)
}