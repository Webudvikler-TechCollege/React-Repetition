import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "../../App/Layout/Layout"
import { ProductListItem } from "./ProductListItem"

export const ProductList = () => {
	const [ productList, setProductList ] = useState([])
	const { group_id } = useParams(0)

	useEffect(() => {
		const getProductList = async () => {
			const result = await axios.get(`https://api.mediehuset.net/stringsonline/products/group/${group_id}`)
			setProductList(result.data.products)
		}
		getProductList()
	}, [group_id])

	return (
		<Layout title="Produkter" description="Se vores produkter">
			{productList && productList.map(product => {
				return (
					<ProductListItem key={product.id} data={product} group_id={group_id} />
				)
			})
			}
		</Layout>
	)
}