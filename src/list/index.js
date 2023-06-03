import { useState, useEffect } from 'react';
import ListItemCard from './ListItemCard';
import './list.scss';
import { Header } from '../containers';
import { useNavigate } from 'react-router-dom/dist';

import { Container } from 'reactstrap';

const List = () => {

	const [recipes, setRecipes] = useState([]);
	const [limit, setLimit] = useState(10);

	let navigate = useNavigate();

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
		<>
			<Header goBackBtn={false} addBtn={() => navigate('/new-recipe')} title='Recepty'/>
			<Container className='recipes_container'>
				<div className='list_wrapper'>

				{recipes.length > 0 ?
					recipes.map(item => <ListItemCard key={item.id} recipe={item}/>)
					:
					<p> Yeah, you ain't got that yummy-yum
					That yummy-yum, that yummy-yummy
					yet, you ain't got that yummy-yum
					That yummy-yum, that yummy-yummy yet.
					</p>
				}
				</div>
			</Container>
		</>
	)
};

export default List;
