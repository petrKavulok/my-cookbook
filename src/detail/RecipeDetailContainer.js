import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from '../components';
import Header from '../containers/Header';

const RecipeDetailContainer = (props) => {

	const [recipe, setRecipe] = useState({});
	const [ratingFromLS, setRatingFromLS] = useState(0);
	const [disableRating, setDisableRating] = useState(false);

	// TODO: replace this sketchy way of getting path with something more soficticated
	const id = useLocation().pathname.split('/detail/').pop();
	let navigate = useNavigate();

	useEffect(() => {
		getDetailInfo();
		getUserRatingFromLS();
	}, []);

	const getUserRatingFromLS = () => {
		let rtng = window.localStorage.getItem(id);
		if (rtng !== null) {
			setRatingFromLS(rtng);
			setDisableRating(true);
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
			<Header addBtn={() => navigate('/new-recipe')} theme='detail'/>
			{recipe ?
			<div className='recipe'>
				<div className='recipe_cover'>
					<div  className='recipe_cover_text p-0'>
						<h1>{recipe && recipe.name}</h1>
					</div>
				</div>
				<div className='recipe_rating_wrapper'>
					<div className='recipe_rating'>
						<Rating disabled={true} score={recipe.score} />
						<div className='duration'>
							<i className='cil-clock pr-2'></i>
							<span>{recipe && recipe.duration} min.</span>
						</div>
					</div>
				</div>
				<div className='recipe_info mt-4'>
					{recipe && recipe.info}
				</div>
				<div className='wrapper'>
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
				</div>
				<div className='recipe_user_rating mt-4'>
					<h3>Ohodnoť tento recept</h3>
					<Rating disabled={disableRating} score={ratingFromLS} id={id} postRate={rate}/>
				</div>
			</div>
			:
			null}
		</>
	)
}

export default RecipeDetailContainer;
