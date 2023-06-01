import { useState, useEffect } from 'react';
import ListItemCard from './ListItemCard';
import './list.scss';

import { Container } from 'reactstrap';

const List = () => {

	const [recipes, setRecipes] = useState([]);
	const [limit, setLimit] = useState(10);

	useEffect(() => {
		getList();
	}, []);

	const getList = async () => {
		let url = 'https://private-anon-354a253d8b-cookbook3.apiary-mock.com/api/v1/recipes';
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
			setRecipes(jsonData);
		} catch (error) {
			console.error(`Looks like we ain't eatin' tonight..`, error);
		}
	}

	return (
		<Container className='recipes_container'>
			{recipes.length > 0 ?
				recipes.map(item => <ListItemCard key={item.id} recipe={item}/>)
				:
				<p> Yeah, you ain't got that yummy-yum
				That yummy-yum, that yummy-yummy
				yet, you ain't got that yummy-yum
				That yummy-yum, that yummy-yummy yet.
				</p>
			}
		</Container>
	)
};

export default List;
