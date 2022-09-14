import { useAuth } from '../Auth/Auth'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { useReducer } from 'react'

const CartButton = ({ product_id }) => {
	const { loginData } = useAuth()
	const { handleSubmit, register } = useForm()
	const [ cartLines, setCartLines ] = useState([])

	/**
	 * Tilføj favorit
	 */
	const addToCart = async (data,e) => {
		const apiKeys = {
			endpoint: 'https://api.mediehuset.net/snippets/cart',
			options: { 
				headers: {
					Authorization: `Bearer ${loginData.access_token}`
				}
			}
		}
		try {
			const result = await axios.get(apiKeys.endpoint, apiKeys.options)
			const cartItems = (result.data.cartlines) ? result.data.cartlines : []
			const exist = cartItems.find(x => x.product_id === product_id)
			
			if(exist) {
				console.log('Exists');
				const formData = new URLSearchParams()
				formData.append('product_id', product_id)
				formData.append('quantity', data.quantity)
				await axios.put(apiKeys.endpoint, formData, apiKeys.options)
			} else {
				console.log('Add');
				const formData = new FormData(e.target)
				await axios.post(apiKeys.endpoint, formData, apiKeys.options)					
			}
		}
		catch(err) {
			console.error(err)
		}

	}

	return (
		<form onSubmit={handleSubmit(addToCart)}>
			<input type="hidden" value={product_id} {...register('product_id', { required: true }) } />
			<input type="number" defaultValue={1} {...register('quantity', { required: true }) } />
			<button>Læg i kurv</button>
		</form>
	);
}

export default CartButton;
