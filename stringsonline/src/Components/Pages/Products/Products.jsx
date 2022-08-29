import { useAuth } from "../../App/Auth/Auth"
import { Layout } from "../../App/Layout/Layout"

export const Products = () => {
	const { loginData } = useAuth();
	return (
		/* Komponent med props title */
		<Layout title="Produkter">
			{!loginData ? (
				<p>Jeg er ikke logget ind</p>
			) : (
				<p>Jeg er logget ind som {loginData.username}</p>
			)}
		</Layout>
	)
}