import one from '../assets/rating/1.svg'
import two from '../assets/rating/2.svg'
import three from '../assets/rating/3.svg'
import four from '../assets/rating/4.svg'
import five from '../assets/rating/5.svg'

export default function getLogo (rating) {
	switch (rating) {
		case 1:
			return one;
		case 2:
			return two
		case 3:
			return three
		case 4:
			return four
		case 5:
			return five
		default:
			return one
	}
}