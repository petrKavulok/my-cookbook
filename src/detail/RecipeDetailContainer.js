import { useEffect, useState } from 'react';
import logo from '../assets/ackee_placeholder.png';
import { useSearchParams, useLocation } from 'react-router-dom';

const RecipeDetailContainer = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [recipe, setRecipe] = useState({});

    // TODO: replace this sketchy way of getting path with something more soficticated
    const id = useLocation().pathname.split('/detail/').pop();

    useEffect(() => {
        getDetailInfo()
    }, []);

    const getDetailInfo = async () => {
        let url = `https://private-anon-db90cb7911-cookbook3.apiary-mock.com/api/v1/recipes/${id}`;
		// let url = `https://cookbook.ack.ee/api/v1/recipes?limit=${limit}&offset=0`;
		try {
			const response = await fetch(url, {
				method: "GET", // *GET, POST, PUT, DELETE, etc.
				headers: {
				  "Content-Type": "application/json",
				}
			});
			const jsonData = await response.json();
			console.log('jsonData: ', jsonData);
			setRecipe(jsonData);
		} catch (error) {
			console.error(`Looks like we ain't eatin' tonight..`, error);
		}
    }

    return (
        <div className='recipe'>
            {recipe && recipe.name}
            {recipe && recipe.duration}
            {recipe && recipe.rating}
            {recipe && recipe.description}
            {recipe && recipe.info}
            {recipe.ingredients && recipe?.ingredients.map((ingredient, i) => {
                return (
                    ingredient
                )
            })}
            {/* <img
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
            </div> */}
            hello
        </div>
    )
}

export default RecipeDetailContainer;
