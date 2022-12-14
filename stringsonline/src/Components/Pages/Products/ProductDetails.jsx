import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../App/Layout/Layout"

export const ProductDetails = () => {
	const { product_id } = useParams();
	const [ productData, setProductData ] = useState({});

	useEffect(() => {
		const getProductData = async () => {
			try {
				const result = await axios.get(`https://api.mediehuset.net/stringsonline/products/${product_id}`)
				setProductData(result.data.item);
			}
			catch(err) {
				console.error(err)
			}
		}
		getProductData();
	}, [product_id])

	return (
		<Layout title="Produkt detaljer">
			{productData ? (
				<div>
					<h2>{productData.name}</h2>
					{productData.image && productData.image.fullpath && (
						<img src={productData.image.fullpath} alt="" />
					)}
					<p className="nl2br">{productData.description_long}</p>
				</div>
			) : null}
		</Layout>
	)
}