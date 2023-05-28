import { Button } from 'reactstrap';
import './header.scss';

const Header = () => {
	return (
		<div className='header'>
			<div className='title'>
				<Button outline primary>
					<i class="cil-arrow-circle-left"></i>
				</Button>
				<h1>Recepty</h1>
			</div>
			<div className='add_item'>
				<Button outline primary>
					<i class="cil-plus"></i>
				</Button>
			</div>
		</div>
	)
};

export default Header;
