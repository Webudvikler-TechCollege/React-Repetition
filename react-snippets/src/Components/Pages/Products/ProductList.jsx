import axios from "axios"
import { useEffect, useState } from "react"
import { Layout } from "../../App/Layout/Layout"
import { Link } from 'react-router-dom'
import FavoriteButton from '../../App/Favorites/FavoriteButton'
import CartButton from "../../App/Cart/CartButton"
import Style from './ProductList.module.scss'

// Function Component til Produktlister
const ProductList = () => {
	// deconstructer vars til api data fra useState hook
	const [ productList, setProductList ] = useState([])

	// useEffect hook til styring af renders
	useEffect(() => {
		// Funktion til at hente data fra api
		const getProductList = async () => {
			const result = await axios.get(`https://api.mediehuset.net/snippets/products`)
			setProductList(result.data.products)
		}
		// Funktionskald
		getProductList()
	}, 
	// Dependency array med group_id - hvis det ændres renderes komponenten
	[setProductList])


	return (
		// Kalder layout komponent med title og description
		<Layout title="Produkter" description="Se vores produkter">
			{/* Mapper product array  */}
			{productList && productList.map(product => {
				// Returnerer komponent med product object som data objekt
				return (
					<ProductListItem key={product.id} data={product} />
				)
			})
			}
		</Layout>
	)
}

/**
 * Function Component til visning af produkter i liste
 * @param {object} props - object med produkt data fra 
 * komponent kald
 * @returns React Function Component
 */
const ProductListItem = props => {
	return (
		// 
		<div className={Style.product_list_item_wrapper}>
			<span>
				<figure>
					<img src={props.data.image} alt="Billede" />
				</figure>
			</span>
			<span>
				<h3>{props.data.name}</h3>
				<p>{props.data.description_short}</p>
				<p><Link to={`/products/${props.data.id}`}>Læs mere &raquo;</Link></p>
			</span>
			<span>
				<p>Pris: {props.data.price} DKK</p>
				<FavoriteButton product_id={props.data.id} />
				<CartButton product_id={props.data.id} />
			</span>
			
		</div>		
	)
}

export { ProductList, ProductListItem }