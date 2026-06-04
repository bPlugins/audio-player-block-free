import { prefix } from '../../../utils/data';
import Default from './Default';
import Slider from './Slider';

const Theme = (props) => {
	const { attributes } = props;
	const { theme = 'default' } = attributes.options || {};

	return <div className={`${prefix} ${theme}Player`}>
		<ThemeSwitch theme={theme} {...props} />
	</div>
}
export default Theme;

const ThemeSwitch = ({ theme, ...props }) => {
	switch (theme) {
		case 'slider':
			return <Slider {...props} />

		default:
			return <Default {...props} />;
	}
}