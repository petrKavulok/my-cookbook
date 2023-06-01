import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import './header.scss';

const Header = (props) => {

	// const history = useHistory();

	return (
		<div className='header'>
			<div className='title'>
				{/* <Button outline color='primary' className='back_button' onClick={() => console.log('hello')}>
					<i className="cil-arrow-left"></i>
				</Button> */}
				<h1>Recepty</h1>
			</div>
			<div className='add_item'>
				{/* TODO: adjust position of the plus button to the center  */}
				<Link to='/new-recipe'>
					<i className="cil-plus"></i>
				</Link>
			</div>
		</div>
	)
};

export default Header;
