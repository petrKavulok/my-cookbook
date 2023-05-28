import { useState, useEffect } from 'react';

const List = () => {

	const [recipes, setRecipes] = useState(10);
	const [limit, setLimit] = useState(10);

	useEffect(() => {
		getList()
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
			console.log(`Looks like we ain't eatin' tonight..`, error);
		}
	}

	return (
		<p>hello</p>
	)
};

export default List;
