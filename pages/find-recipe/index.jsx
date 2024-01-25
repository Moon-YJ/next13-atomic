import clsx from 'clsx';
import styles from './find-recipe.module.scss';
import Category from '@/components/molecules/category/Category';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import Card from '@/components/molecules/card/Card';
import SearchBar from '@/components/molecules/searchBar/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import Text from '@/components/atoms/text/Text';

export default function FindRecipe({ categories }) {
	const [Names, setNames] = useState(categories.map(el => el.strCategory));
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const debouncedSelected = useDebounce(Selected);
	const [Search, setSearch] = useState('');
	const debouncedSearch = useDebounce(Search);
	const { data: dataByCategory, isSuccess } = useRecipeByCategory(debouncedSelected, '');
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(debouncedSearch);

	const handleClick = activeEl => {
		setSearch('');
		setSelected(activeEl);
	};

	useEffect(() => {
		if (Search) setSelected('');
	}, [Search]);

	return (
		<section className={clsx(styles.findRecipe)}>
			<div className={clsx(styles.controller)}>
				<Category dataArr={Names} selectedEl={Selected} onClick={handleClick} className={clsx(styles.category)} />
				<SearchBar placeholder='Search Recipe' className={clsx(styles.search)} onChange={setSearch} value={Search} />
			</div>
			<h1>{Search ? 'Search: ' + Search : Selected}</h1>
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
			{/* Search 결과값 없는 경우 */}
			{isSearch && dataBySearch.length === 0 && <Text>No Recipe matched</Text>}
			{/* Search값 비어있는 경우 */}
			{Search === '' && isSearch && <Text>No Text</Text>}
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
