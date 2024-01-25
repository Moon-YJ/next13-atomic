import clsx from 'clsx';
import styles from './my-favorite.module.scss';

export default function MyFavorite() {
	/*
		// 이렇게 써도 동작은 됨
		// 하지만 동일한 fetching함수로 여러개의 useQuery의 리턴값을 받을때 useQuery훅을 반복호출하는게 아닌 useQueries를 활용해야 되는 이유는
		// 사용자 이벤트에 의해서 그룹으로 묶여있는 쿼리요청중 변경되는 쿼리에 대한 요청만 실행할때 효율적
		const queryArr = ['a', 'b', 'c'];
	 	const resultArr = queryArr.map(el => useRecipeById(el));
	*/

	return (
		<section className={clsx(styles.myFavorite)}>
			<h1>My Favorite</h1>
		</section>
	);
}
