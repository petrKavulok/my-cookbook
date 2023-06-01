import { useEffect, useState } from 'react';
import logo from '../assets/ackee_placeholder.png';
import { useSearchParams, useLocation } from 'react-router-dom';
import { getLogo, Rating } from '../components';
// import '../components/star.scss'


const RecipeDetailContainer = (props) => {

	const [searchParams, setSearchParams] = useSearchParams();
	const [recipe, setRecipe] = useState({});
	const [rating, setRating] = useState(0);
	const [ratingFromLS, setRatingFromLS] = useState(0);
	const [disableRating, setDisableRating] = useState(false);

	// TODO: replace this sketchy way of getting path with something more soficticated
	const id = useLocation().pathname.split('/detail/').pop();
	// let src;

	useEffect(() => {
		getDetailInfo();
		getUserRatingFromLS();
	}, []);

	const getUserRatingFromLS = () => {
		let rtng = window.localStorage.getItem(id);
		// console.error('rtgn', rtng)
		if (rtng !== null) {
			setRatingFromLS(rtng);
			setDisableRating(true);
			console.warn('inside if statement', rtng)
		}
	}

	const getDetailInfo = async () => {
		let url = `https://private-anon-db90cb7911-cookbook3.apiary-mock.com/api/v1/recipes/${id}`;
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
				"Content-Type": "application/json",
				}
			});
			const jsonData = await response.json();
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
		<>
			{recipe ?
			<div className='recipe'>
				<h1>{recipe && recipe.name}</h1>
				<div className='recipe_rating'>
					<Rating disabled={true} score={recipe.score} />
					<div className='duration'>
						<i className='cil-clock pr-2'></i>
						<span>{recipe && recipe.duration} min.</span>
					</div>

				</div>

				<div className='recipe_info mt-4'>
					{recipe && recipe.info}
				</div>

				<div className='recipe_ingredients mt-4'>
					<h3>Ingredience</h3>
					<ul className='ingredience_list'>
						{recipe.ingredients && recipe?.ingredients.map((ingredient, i) => {
							return (
								<li>{ingredient}</li>
							)
						})}
					</ul>
				</div>

				<div className='recipe_description mt-4'>
					<h3>Příprava jídla</h3>
					{recipe && recipe.description}
				</div>

				<div className='recipe_user_rating mt-4'>
					<h3>Ohodnoť tento recept</h3>
					<Rating disabled={disableRating} score={ratingFromLS} id={id}/>
				</div>
			</div>
			:
			null}
		</>
	)
}

export default RecipeDetailContainer;
