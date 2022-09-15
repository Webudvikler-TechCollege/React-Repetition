import { useEffect } from "react"

// Function Component til side hoved layout
const Layout = props => {
	const hidetitle = (props.hidetitle) ? props.hidetitle : false;

	// useEffect renderer når title eller description skifter værdi
	useEffect(() => {
		// Sætter dokumentets titel
		document.title = props.title
		// Hvis description er sat på props objekt
		if(props.description) {
			// Sæt description i dom'en
			document.querySelector('meta[name="description"]')
				.setAttribute('content', props.description)
		}
		// Dependency array overvåger title og description
	}, [props.title, props.description])

	return (
		<>
			{!props.hidetitle && 
				<h1>{props.title}</h1>
			}
			<section>{props.children}</section>
		</>
	)
}

export { Layout }