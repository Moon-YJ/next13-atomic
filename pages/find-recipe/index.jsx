import clsx from 'clsx';
import styles from './find-recipe.module.scss';
import Category from '@/components/molecules/category/Category';
import axios from 'axios';
import { useState } from 'react';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import Card from '@/components/molecules/card/Card';
import SearchBar from '@/components/molecules/searchBar/SearchBar';

export default function FindRecipe({ categories }) {
	const [Names, setNames] = useState(categories.map(el => el.strCategory));
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');
	const { data: dataByCategory, isSuccess } = useRecipeByCategory(Selected, '');
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(Search);

	const handleClick = activeEl => {
		setSelected(activeEl);
	};

	return (
		<section className={clsx(styles.findRecipe)}>
			<div className={clsx(styles.controller)}>
				<Category dataArr={Names} selectedEl={Selected} onClick={handleClick} className={clsx(styles.category)} />
				<SearchBar placeholder='Search Recipe' className={clsx(styles.search)} onChange={setSearch} value={Search} />
			</div>
			<h1>{Selected}</h1>
			{/* Search */}
			{isSearch &&
				dataBySearch.map(data => {
					return (
						<Card
							key={data.idMeal}
							imgSrc={data.strMealThumb}
							txt={data.strMeal}
							className={clsx(styles.foodItems)}
							url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
						/>
					);
				})}
			{/* Category */}
			{isSuccess &&
				dataByCategory.map(data => {
					return (
						<Card
							key={data.idMeal}
							imgSrc={data.strMealThumb}
							txt={data.strMeal}
							className={clsx(styles.foodItems)}
							url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
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
