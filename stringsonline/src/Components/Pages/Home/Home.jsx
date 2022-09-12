import { Layout } from "../../App/Layout/Layout"

// Function Component Home
export const Home = () => {
	return (
		// Kalder Layout component med title og description props
		<Layout title="Velkommen til StringsOnline" description="StringsOnline sælger musikinstrumenter">
			{/* Alt inde i Layout komponentet er props.children */}
			<p>Køb dine kvalitetsinstrumenter online!</p>

		</Layout>
	)
}