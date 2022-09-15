import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAuth } from '../Auth/Auth'
import { useCart } from '../Context/CartProvider'

const CartButton = ({product_id}) => {
	const { loginData } = useAuth()
	const { cartLines } = useCart();
	const [ quantityInCart, setQuantityInCart ] = useState(0)

	const endpoint = 'https://api.mediehuset.net/snippets/cart'
	const options = {
		headers: {
			Authorization: `Bearer ${loginData.access_token}`
		}
	}

	useEffect(() => {
	
		if(cartLines) {
			const objInCart = cartLines.find(item => item.product_id === product_id);
		
			if(objInCart) {
				setQuantityInCart(objInCart.quantity);
			}	
		}		
	}, [cartLines, product_id, quantityInCart])



	const decreaseCartItem = () => {
		console.log(parseInt(quantityInCart)-1);
	}

	const increaseCartItem = async () => {
		const newQuantity = parseInt(quantityInCart)+1
		//console.log(product_id, newQuantity)
		const urlParams = new URLSearchParams()
		urlParams.append('product_id', product_id)
		urlParams.append('quantity', newQuantity)
		if(quantityInCart) {
			//console.log(1234);
			await axios.delete(`${endpoint}/${product_id}`, options)
		}
		await axios.post(endpoint, urlParams, options)
		setQuantityInCart(newQuantity)
		
	}
	
	

	return (
		<form>
			<input type="hidden" name="" value={product_id} />
			<button type="button" onClick={() => decreaseCartItem}>-</button>
			<input type="number" disabled value={(quantityInCart) ? quantityInCart : 0}></input>
			<button type="button" onClick={increaseCartItem}>+</button>
		</form>
	)
}

export default CartButton;