import logo from '../assets/ackee_placeholder.png';
import DateTime from '../components/DateTime';

const ListItemCard = ({recipe}) => {
    // const placeholder = import('../assets/placeholder.jpeg')

    return (
        <div className='recipe'>
            <img
                src={recipe.img ?? logo}
                alt={recipe.name}
                className='list_item_cover_pic'>
            </img>
            <div className='list_item_info'>
                <h2>{recipe.name}</h2>
                <div>
                    {recipe.score}
                </div>
                <div className='recipe_duration'>
                    <i className='cil-clock pr-2'></i>
                    <span>{recipe.duration} min.</span>
                </div>
            </div>
        </div>
    )
}

export default ListItemCard;
