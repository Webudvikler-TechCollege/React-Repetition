import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../Auth/Auth";

const CartContext = createContext()

const CartProvider = ({children}) => {
	const { loginData } = useAuth()
	const [ cartLines, setCartLines ] = useState([])

	useEffect(() => {
		const getCartData = async () => {
			try {
				if(loginData) {
					const options = {
						headers: {
							Authorization: `Bearer ${loginData.access_token}`
						}
					}
					const endpoint = 'https://api.mediehuset.net/snippets/cart'
					const result = await axios.get(endpoint, options);
					if(result.data.cartlines) {
						setCartLines(result.data.cartlines)
					}
				}
			} catch(err) {
				console.log(`Fejl i cart provider: ${err}`);
			}
		}
		getCartData()
	}, [children, loginData, loginData.access_token])

	return (
		<CartContext.Provider value={{cartLines, setCartLines}}>
			{children}
		</CartContext.Provider>
	);
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart };
