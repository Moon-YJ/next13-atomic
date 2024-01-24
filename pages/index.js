import Head from 'next/head';
import styles from './Home.module.scss';

export default function Home() {
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={styles.main}></main>
		</>
	);
}
