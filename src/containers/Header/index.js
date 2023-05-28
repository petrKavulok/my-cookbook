import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import './header.scss';

const Header = () => {

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
				<a href='/'>
					<i className="cil-plus"></i>
				</a>
			</div>
		</div>
	)
};

export default Header;
