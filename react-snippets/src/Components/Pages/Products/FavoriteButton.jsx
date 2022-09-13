import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../../App/Auth/Auth'
import { AiOutlineHeart } from 'react-icons/ai'
import Styles from './FavoriteButton.module.scss'

const FavoriteButton = ({ product_id }) => {
	const { loginData } = useAuth()
	const [ isFavorite, setIsFavorite ] = useState(false)
	const [ myFavorites, setMyFavorites ] = useState([])

	useEffect(() => {
		const getFavorites = async () => {
			const options = {
				headers: {
					Authorization: `Bearer ${loginData.access_token}`
				}
			}
			const endpoint = "https://api.mediehuset.net/snippets/favorites"
			const result = await axios.get(endpoint, options)
			if(result.data.items) {
				setMyFavorites(result.data.items)
			}
		}
		getFavorites()
	}, [loginData.access_token])

	useEffect(() => {
		const isMyFavorite = myFavorites.some(elm => elm.product_id === product_id)
		setIsFavorite(isMyFavorite)
	},[myFavorites, product_id])

	const addFavorite = async () => {
		setIsFavorite(true)

		const options = {
			headers: {
				Authorization: `Bearer ${loginData.access_token}`
			}
		}
		const endpoint = "https://api.mediehuset.net/snippets/favorites"
		const formData = new FormData();
		formData.append('product_id',product_id)
		await axios.post(endpoint, formData, options)		
	}

	const removeFavorite = async () => {
		setIsFavorite(false)

		const options = {
			headers: {
				Authorization: `Bearer ${loginData.access_token}`
			}
		}
		const endpoint = `https://api.mediehuset.net/snippets/favorites/${product_id}`
		await axios.delete(endpoint, options)

	}

	return (
		<button 
			onClick={!isFavorite ? addFavorite : removeFavorite} 
			className={isFavorite ? `${Styles.button} ${Styles.active}` : Styles.button}>
			<AiOutlineHeart />
		</button>
	);
}

export default FavoriteButton;
