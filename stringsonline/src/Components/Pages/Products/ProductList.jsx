import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "../../App/Layout/Layout"
import { ProductListItem } from "./ProductListItem"

// Function Component til Produktlister
export const ProductList = () => {
	// deconstructor group_id fra url params hook
	const { group_id } = useParams(0)

	// deconstructer vars til api data fra useState hook
	const [ productList, setProductList ] = useState([])

	// useEffect hook til styring af renders
	useEffect(() => {
		// Funktion til at hente data fra api
		const getProductList = async () => {
			const result = await axios.get(`https://api.mediehuset.net/stringsonline/products/group/${group_id}`)
			setProductList(result.data.products)
		}
		// Funktionskald
		getProductList()
	}, 
	// Dependency array med group_id - hvis det ændres renderes komponenten
	[group_id])

	return (
		// Kalder layout komponent med title og description
		<Layout title="Produkter" description="Se vores produkter">
			{/* Mapper product array  */}
			{productList && productList.map(product => {
				// Returnerer komponent med product object som data objekt
				return (
					<ProductListItem key={product.id} data={product} group_id={group_id} />
				)
			})
			}
		</Layout>
	)
}