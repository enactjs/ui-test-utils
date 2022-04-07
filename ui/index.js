import {createRoot} from 'react-dom/client';
import App from 'UI_TEST_APP_ENTRY';

const url = new URL(window.location.href);
const locale = url.searchParams.get('locale');

const appElement = (<App locale={locale} />);

if (typeof window !== 'undefined') {
	createRoot(document.getElementById('root'))
	.render(appElement);
}

export default appElement;
