import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAuth } from '../Auth/Auth'
import { useCart } from '../Context/CartProvider'

/**
 * Knap komponent til at styre shoppingcart med
 * Anvender CartProvider med useContext metode
 * Kræver login
 * @param {*} param0 
 * @returns 
 */
const CartButton = ({ product_id }) => {
	// Henter logindata
	const { loginData } = useAuth()
	// Henter eksisterende linjer fra brugers kurv
	const { cartLines } = useCart();

	const [ isInCart, setIsInCart ] = useState(false)
	// Sætter hook til at styre antallet af produkter
	const [ quantityInCart, setQuantityInCart ] = useState(0)

	// Sætter API endpoint og header auth options
	const endpoint = 'https://api.mediehuset.net/snippets/cart'
	const options = {
		headers: {
			Authorization: `Bearer ${loginData.access_token}`
		}
	}

	// Bruger useEffect til at hente antal hvis produktet allerede ligger i kurven
	useEffect(() => {
		// Hvis kurv liste array har en længde...
		if(cartLines.length) {
			// Sæt state var til bool efter om produkt er i kurv eller ej
			setIsInCart(cartLines.some(item => item.product_id === product_id))
			// Hvis produkt er i kurv
			if(isInCart) {
				// Hent objekt fra array
				const objInCart = cartLines.find(item => item.product_id === product_id)
				// Sæt tilstandsvariabel til antal objektets fra objektet
				setQuantityInCart(objInCart.quantity);
			}
		}
		// VS Code har mange forslag til DP array men denne her fungerer!
	}, [cartLines, isInCart])

	/**
	 * Nedskriver antal med 1
	 */
	const decreaseCartItem = async () => {
		// Min antal skal være 1
		if(quantityInCart > 0) {
			const newQuantity = parseInt(quantityInCart)-1

			// Kalder instans af URLSearchParams og tilføjer form data
			const urlParams = new URLSearchParams()
			urlParams.append('product_id', product_id)
			urlParams.append('quantity', newQuantity)

			// Opdaterer med nyt antal
			await axios.put(endpoint, urlParams, options)
			// Opdaterer state quantity var
			setQuantityInCart(newQuantity)

		}
	}

	/**
	 * Opskriver antal med 1
	 */
	 const increaseCartItem = async () => {
		const newQuantity = parseInt(quantityInCart)+1

		// Kalder instans af URLSearchParams og tilføjer form data
		const urlParams = new URLSearchParams()
		urlParams.append('product_id', product_id)
		urlParams.append('quantity', newQuantity)

		// Put (update) hvis state isincart var er true - eller post (create)
		if(isInCart) {
			await axios.put(endpoint, urlParams, options)
		} else {
			await axios.post(endpoint, urlParams, options)
		}
		// Opdater state quantity var 
		setQuantityInCart(newQuantity)
	}
	
	return (
		<form>
			<input type="hidden" name="" value={product_id} />
			<button type="button" onClick={decreaseCartItem}>-</button>
			<input type="number" disabled value={(quantityInCart) ? quantityInCart : 0}></input>
			<button type="button" onClick={increaseCartItem}>+</button>
		</form>
	)
}

export default CartButton;