import axios from 'axios'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../Auth/Auth'
import { useCart } from '../Context/CartProvider'

const CartButton = ({product_id}) => {
	const { loginData } = useAuth()
	const { cartLines } = useCart();
	const [ quantityInCart, setQuantityInCart ] = useState(1)
	const { register, handleSubmit } = useForm()

	useEffect(() => {
		if(cartLines) {
			const objInCart = cartLines.find(item => item.product_id === product_id);
		
			if(objInCart) {
				setQuantityInCart(objInCart.quantity);
			}	
		}
	}, [cartLines, product_id, quantityInCart])

	const handleCart = async (data, e) => {
		console.log(cartLines);
	}
	
	return (
		<form onSubmit={handleSubmit(handleCart)}>
			<input type="hidden" defaultValue={product_id} {...register('product_id')} />
			<input type="number" value={quantityInCart} {...register('quantity', { required: true })}></input>
			<button>Læg i kurv</button>
		</form>
	)
}

export default CartButton;
