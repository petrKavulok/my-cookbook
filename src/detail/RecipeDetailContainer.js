import { useEffect, useState } from 'react';
import logo from '../assets/ackee_placeholder.png';
import { useSearchParams, useLocation } from 'react-router-dom';

const RecipeDetailContainer = (props) => {

	const [searchParams, setSearchParams] = useSearchParams();
	const [recipe, setRecipe] = useState({});
	const [rating, setRating] = useState(0);

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
				method: "GET",
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

	const rate = async (value) => {
		let url = `https://private-anon-db90cb7911-cookbook3.apiary-mock.com/api/v1/recipes/${id}/ratings`;
		try {
			await fetch(url, {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({
					score: value
				})
			});
		} catch (error) {
			console.error(`Looks like we ain't ratin' tonight..`, error);
		}
	}


	return (
		<div className='recipe'>
			<h1>{recipe && recipe.name}</h1>
			<div className='recipe-rating'>
				{/* {recipe && recipe.rating} */}
				<div>****</div>
				<div className='duration'>
					<i className='cil-clock pr-2'></i>
					<span>{recipe && recipe.duration} min.</span>
				</div>

			</div>
			<div className='recipe-info mt-4'>
				{recipe && recipe.info}
			</div>

			<div className='recipe-ingredients mt-4'>
				<h3>Ingredience</h3>
				<ul className='ingredience-list'>

				{recipe.ingredients && recipe?.ingredients.map((ingredient, i) => {
					return (
						<li>{ingredient}</li>
						)
					})}
				</ul>
			</div>

			<div className='recipe-description mt-4'>
				<h3>Příprava jídla</h3>
				{recipe && recipe.description}
			</div>
		</div>
	)
}

export default RecipeDetailContainer;
