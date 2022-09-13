import { Layout } from "../../App/Layout/Layout"
import { ProductList } from "./ProductList"

export const Products = () => {
	return (
		<Layout title="Produkter" description="Eksempel">
			<p>Se vores udvalg</p>
			<ProductList />
		</Layout>
	)
}