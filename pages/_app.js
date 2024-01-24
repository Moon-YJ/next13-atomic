import axios from 'axios';
import '@/styles/globals.scss';
import '@/styles/theme.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from '@/hooks/useGlobalContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/components/template/layout/Layout';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	return (
		<GlobalProvider>
			<QueryClientProvider client={queryClient}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</GlobalProvider>
	);
}
