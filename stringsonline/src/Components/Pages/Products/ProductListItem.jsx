import { Link } from 'react-router-dom'
import Style from './ProductListItem.module.scss'

export const ProductListItem = props => {
	return (
		<div className={Style.product_list_item_wrapper}>
			<span>
				<figure>
					<img src={props.data.image_fullpath} alt="Billede" />
				</figure>
			</span>
			<span>
				<h3>{props.data.name}</h3>
				<p>Varenummer: {props.data.item_number}</p>
				<p>{props.data.description_short}</p>
				<p><Link to={`/products/${props.group_id}/${props.data.id}`}>Læs mere &raquo;</Link></p>
			</span>
			<span>
				<p>Pris: {props.data.price} DKK</p>
				<button>Læg i kurv</button>
			</span>
			
		</div>		
	)
}