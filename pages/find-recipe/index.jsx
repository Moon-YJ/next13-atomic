import clsx from 'clsx';
import styles from './find-recipe.module.scss';
import Category from '@/components/molecules/category/Category';
import axios from 'axios';
import { useState } from 'react';
import { useRecipeByCategory } from '@/hooks/useRecipe';
import Card from '@/components/molecules/card/Card';

export default function FindRecipe({ categories }) {
	console.log(categories);
	const [Names, setNames] = useState(categories.map(el => el.strCategory));
	const [Selected, setSelected] = useState(categories[0].strCategory);
	console.log(Selected);
	const { data: dataByCategory, isSuccess } = useRecipeByCategory(Selected, '');
	console.log(dataByCategory, ':::');

	const handleClick = activeEl => {
		setSelected(activeEl);
	};

	return (
		<section className={clsx(styles.findRecipe)}>
			<Category dataArr={Names} selectedEl={Selected} onClick={handleClick} className={clsx(styles.category)} />
			<h1>{Selected}</h1>
			{isSuccess &&
				dataByCategory.map(data => {
					return (
						<Card
							key={data.idMeal}
							imgSrc={data.strMealThumb}
							txt={data.strMeal}
							className={clsx(styles.foodItems)}
							url={`/find-recipe/${data.idMeal}`}
						/>
					);
				})}
		</section>
	);
}

// SSR 방식으로 데이터 호출
export async function getStaticProps() {
	const { data } = await axios.get('/categories.php');
	return { props: { categories: data.categories } };
}
