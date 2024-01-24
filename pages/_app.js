import axios from 'axios';
import '@/styles/globals.scss';
import '@/styles/theme.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from '@/hooks/useGlobalContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/lib/devtools';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	return (
		<GlobalProvider>
			<QueryClientProvider client={queryClient}>
				<div>
					<Component {...pageProps} />
				</div>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</GlobalProvider>
	);
}
