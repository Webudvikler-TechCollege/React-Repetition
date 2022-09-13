import { useAuth } from "../../App/Auth/Auth"
import { Layout } from "../../App/Layout/Layout"

// Function Component Extranet
export const Extranet = () => {

	// Eksempel på anvendelse af useAuth hook
	const { loginData } = useAuth();
	
	return (
		// Kalder Layout component med title og description props
		<Layout title="Ekstranet">
			{/* Eksempel på tracking af om bruger er logget ind */}
			{!loginData ? (
				<p>Jeg er ikke logget ind</p>
			) : (
				<p>Jeg er logget ind som {loginData.username}</p>
			)}
		</Layout>
	)
}