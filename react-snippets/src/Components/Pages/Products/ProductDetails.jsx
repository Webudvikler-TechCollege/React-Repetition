import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../App/Layout/Layout"
import { useAuth } from "../../App/Auth/Auth"
import { CommentsForm } from "../../App/Comments/Comments"
import Styles from './ProductDetails.module.scss'

export const ProductDetails = () => {
	const { loginData } = useAuth()
	const { product_id } = useParams();
	const [ productData, setProductData ] = useState({});

	useEffect(() => {
		const getProductData = async () => {
			try {
				const result = await axios.get(`https://api.mediehuset.net/snippets/products/${product_id}`)
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
				<div className={Styles.details}>
					<h2>{productData.name}</h2>
					{productData.image && (
						<img src={productData.image} alt="" />
					)}
					<p className="nl2br">{productData.description_long}</p>
					{loginData && loginData.access_token ? (
						<CommentsForm product_id={product_id} />
					) : null }
				</div>
			) : null}
		</Layout>
	)
}