import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../Auth/Auth";

const FavoriteContext = createContext()

const FavoriteProvider = ({children}) => {
	const { loginData } = useAuth()
	const [ favorites, setFavorites ] = useState([])

	useEffect(() => {
		const getFavorites = async () => {
			try {
				if(loginData) {
					const options = {
						headers: {
							Authorization: `Bearer ${loginData.access_token}`
						}
					}
					const endpoint = 'https://api.mediehuset.net/snippets/favorites'
					const result = await axios.get(endpoint, options);
					if(result.data.items) {
						setFavorites(result.data.items)
					}
				}
			} catch(err) {
				console.log(`Fejl i Favorite Provider: ${err}`);
			}
		}
		getFavorites()
	}, [children, loginData, loginData.access_token])

	return (
		<FavoriteContext.Provider value={{favorites, setFavorites}}>
			{children}
		</FavoriteContext.Provider>
	);
}

const useFavorites = () => useContext(FavoriteContext)

export { FavoriteProvider, useFavorites };
