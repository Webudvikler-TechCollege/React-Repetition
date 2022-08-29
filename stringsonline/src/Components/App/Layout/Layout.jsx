import { useEffect } from "react"

const Layout = props => {
	useEffect(() => {
		document.title = props.title
		if(props.description) {
			document.querySelector('meta[name="description"]')
				.setAttribute('content', props.description)
		}
	}, [props.title, props.description])

	return (
		<>
			<h1>{props.title}</h1>
			<section>{props.children}</section>
		</>
	)
}

export { Layout }
