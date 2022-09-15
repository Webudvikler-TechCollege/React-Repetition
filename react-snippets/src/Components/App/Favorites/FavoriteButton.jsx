import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../../App/Auth/Auth"
import { AiOutlineHeart } from "react-icons/ai"
import Styles from "./FavoriteButton.module.scss"
import { useFavorites } from "../Context/FavoriteProvider"

/**
 * Knap komponent som kan tilføje og fjerne et 
 * produkt fra en favorit liste.
 * Anvender FavoriteProvider med useContext metode
 * @param {*} param 
 * @returns 
 */
const FavoriteButton = ({ product_id }) => {
  // Henter auth data
  const { loginData } = useAuth()
  // Henter liste over eksisterende favoritter
  const { favorites } = useFavorites()
  // Sætter var til at indikere om produkt er favorit eller ej
  const [isFavorite, setIsFavorite] = useState(false)

  // Kalder useEffect
  useEffect(() => {
	// Hvis vi allerede har favoritter...
    if(favorites.length) {
	  // Setter bool efter om produkt ligger i listen over favoritter
      setIsFavorite(() =>
        favorites.some((item) => item.product_id === product_id)
      )
    }
  }, [favorites, product_id])

  // Toggle funktion 
  const toggleFavorite = async () => {
	// Endpoint path
    const endpoint = "https://api.mediehuset.net/snippets/favorites"
	// Header options med token key
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    }

	// Hvis favorit er true
    if (isFavorite) {
	  // Delete request til api endpoint
	  await axios.delete(`${endpoint}/${product_id}`, options)
      setIsFavorite(false)
    } else {
	  // Sætter form data
      const formData = new FormData()
      formData.append("product_id", product_id)
	  // Create kald til API endpoint
      await axios.post(endpoint, formData, options)
      setIsFavorite(true)
    }
  }

  return (
    <>
      <button
        onClick={toggleFavorite}
        className={
          isFavorite ? `${Styles.button} ${Styles.active}` : Styles.button
        }
      ><AiOutlineHeart /></button>
    </>
  )
}

export default FavoriteButton
