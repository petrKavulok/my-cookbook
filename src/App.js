import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './assets/ackee_placeholder.png';
import List from './list';
import './App.scss';
import './detail/recipe.scss';
const RecipeDetailContainer = lazy(() => import('./detail/RecipeDetailContainer'));
const RecipeCreateContainer = lazy(() => import('./detail/RecipeCreateContainer'));

function App() {

	const routes = [
		{
			path: '/', // Url path
			exact: true,        // Whether path must be matched exactly
			name: 'Home',  // Route name
			component: <List /> // Component to be rendered
		},
		{
			path: '/detail/:id',
			exact: true,
			name: 'Recipe Detail',
			component: <RecipeDetailContainer />
		},
		{
			path: '/new-recipe',
			exact: true,
			name: 'New Recipe',
			component: <RecipeCreateContainer />
		}
	]
return (
		<Router>
			<div className="App">
				<Suspense fallback={<img src={logo} alt='Logo'/>}>
					<Routes>
						{routes.map((route, idx) => {
							return (
								<Route
									key={idx}
									path={`${route.path}`}
									exact={route.exact}
									name={route.name}
									element={route.component}
								/>
							)
						})}
					</Routes>
				</Suspense>
			</div>
		</Router>
);
}

export default App;
