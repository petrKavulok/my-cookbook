import logo from '../assets/ackee_placeholder.png';
import { Link } from 'react-router-dom';
import { getLogo } from '../components';

const ListItemCard = ({recipe}) => {

	let src = getLogo(recipe.score);

	return (
		<div className='recipe_list_item'>
			<img
				src={recipe.img ?? logo}
				alt={recipe.name}
				className='list_item_cover_pic'>
			</img>
			<div className='list_item_info'>
				<Link to={`/detail/${recipe.id}`}>
					<h2>{recipe.name}</h2>
				</Link>
				<div className='list_item_rating'>
					<img src={src}></img>
					{/* {recipe.score} */}
				</div>
				<div className='list_item_duration'>
					<i className='cil-clock pr-2'></i>
					<span>{recipe.duration} min.</span>
				</div>
			</div>
		</div>
	)
}

export default ListItemCard;
