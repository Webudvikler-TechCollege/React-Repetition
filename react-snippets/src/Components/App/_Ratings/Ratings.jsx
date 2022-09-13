import axios from 'axios'
import { useState } from "react"
import { useAuth } from '../Auth/Auth'
import Style from './Ratings.module.scss'

export const Ratings = props => {
	const { loginData } = useAuth();
	const [ itemId, setItemId ] = useState('')

	const arrStars = []
	for(let i = 1; i <= props.stars; i++) {
		arrStars.push({ value: i, selected: false })
	}

	const handleMouseOver = placement => {
		if(loginData.username) {
			for(let i = 1; i < placement; i++) {
				arrStars[i].selected = true
			}
		}
	}

	const handleClick = placement => {
		createRating(placement)
	}

	const createRating = async (value) => {
		const url = 'https://api.mediehuset.net/stringsonline/ratings'
		const formData = new FormData()
		formData.append('product_id', props.id)
		formData.append('num_stars', value)
		console.log(...formData);
		const options = {
			headers: {
				'Authorization': `Bearer loginData.access_token`
			}
		}

		console.log(options);
		const res = await axios.post(url,formData,options);
		console.log(res);

	}



	return (
		<div>
			{arrStars.map(star => {
				return (
					<svg className={Style.starIcon} key={star.value} viewBox="0 0 117.34 111.59">
						<polygon 
							className={star.selected ? `${Style.starIcon_star} ${Style.selected}` : Style.starIcon_star} 
							data-placement={star.value} 
							onMouseOver={(e) => { handleMouseOver(e.target.getAttribute('data-placement')) }} 
							onClick={(e) => { handleClick(e.target.getAttribute('data-placement')) }} 
							points="58.67 91.97 23.07 110.68 29.87 71.04 1.07 42.97 40.87 37.19 58.67 1.13 76.47 37.19 116.26 42.97 87.47 71.04 94.26 110.68 58.67 91.97"
						/>
					</svg>				)
			})

			}
		</div>
	)
}