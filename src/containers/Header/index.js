import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import './header.scss';

const Header = ({title = null, goBackBtn = true, addBtn, theme = 'ackee', }) => {

	let navigate = useNavigate();

	const handleClick = (path) => {
		navigate(path);
	}

	return (
		<div className={`header ${theme !== 'ackee' ? 'reverse' : ''}`}>
			<div className="header_content">
				<div className='title'>
					{goBackBtn && <Button
						outline
						color='primary'
						className='back_button'
						onClick={() => handleClick('/')}
						>
						<i className="cil-arrow-left"></i>
					</Button> }
					{title && <h1>{title}</h1>}
				</div>
				<div className='add_item'>
					{addBtn && <Button
						outline
						color='primary'
						className='back_button'
						onClick={() => addBtn()}
						>
						<i className="cil-plus"></i>
					</Button>}
				</div>
			</div>
		</div>
	)
};

export default Header;
