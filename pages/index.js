import Head from 'next/head';
import styles from './Home.module.scss';
import axios from 'axios';
import Visual from '@/components/organisms/visual/Visual';
//import Layout from '@/components/template/layout/Layout';
//import Image from 'next/image';

export default function Home({ meals, category }) {
	console.log(meals);
	console.log(category);

	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={styles.main}>
				<Visual dataArr={meals.slice(0, 5)} category={category} />
				{/* <h1>Main Page</h1>
				<h2>{category}</h2>
				{meals.map((data, idx) => {
					if (idx > 5) return null;
					return (
						<article key={idx}>
							<Image src={data.strMealThumb} alt={data.strMeal} width={100} height={100} priority />
							<h3>{data.strMeal}</h3>
						</article>
					);
				})} */}
			</main>
		</>
	);
}

export async function getStaticProps() {
	const list = [];
	const { data: obj } = await axios.get('/categories.php');
	const items = obj.categories;
	items.forEach(el => list.push(el.strCategory));
	const newList = list.filter(el => el !== 'Goat' && el !== 'Vegan' && el !== 'Starter');
	// newList의 개수를 최대치로 한 랜덤 정수 반환 공식
	const randomNum = Math.floor(Math.random() * newList.length);
	const { data: meals } = await axios.get(`/filter.php?c=${newList[randomNum]}`);

	return { props: { ...meals, category: newList[randomNum] }, revalidate: 60 }; // 1분마다 갱신되게
}
