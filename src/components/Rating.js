import { useEffect, useState } from "react";

const Rating = ({disabled = false, score = 0, id = null, postRate = undefined}) => {

	const [rating, setRating] = useState(score);
	const [hover, setHover] = useState(score);
	const [disable, setDisable] = useState(disabled);

	useEffect(() => {
		setHover(score)
		setRating(score)
	}, [score]);

	useEffect(() => {
		setDisable(disabled)
	}, [disabled]);

	const rate = (index) => {
		setRating(index);
		setDisable(true);
		localStorage.setItem(id, index);
		postRate && postRate();
	};

	return (
		<div className="star_rating">
		{[...Array(5)].map((star, index) => {
			index += 1;
			return (
			<button
				type="button"
				key={index}
				disabled={disable}
				title={disable ? `V minulosti jste hodnotili ${rating}` : `Přidat hodnocení ${index}`}
				className={`${index <= (hover || rating) ? "on" : "off"} star_button`}
				onClick={() => rate(index)}
				onMouseEnter={() => setHover(index)}
				onMouseLeave={() => setHover(rating)}
			>
				<span className="star">&#9733;</span>
			</button>
			);
		})}
		</div>
	);

};

export default Rating;