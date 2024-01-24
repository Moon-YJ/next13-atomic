import axios from 'axios';
import '@/styles/globals.scss';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

export default function App({ Component, pageProps }) {
	return (
		<div>
			<Component {...pageProps} />
		</div>
	);
}
