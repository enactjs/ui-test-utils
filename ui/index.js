import {render} from 'react-dom';
import App from 'UI_TEST_APP_ENTRY';

const url = new URL(window.location.href);
const locale = url.searchParams.get('locale');

const appElement = (<App locale={locale} />);

if (typeof window !== 'undefined') {
	render(
		appElement,
		document.getElementById('root')
	);
}

export default appElement;
