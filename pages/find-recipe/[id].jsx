import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import styles from './detail.module.scss';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';
import List from '@/components/atoms/list/List';

export default function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);

	useEffect(() => {
		if (data) {
			// key값을 뽑아서
			let keys = Object.keys(data);
			// strIngredient로 시작하는 key값만 추출
			keys = keys.filter(key => key.startsWith('strIngredient'));
			// 그중에서 value값이 있는 key값만 다시 추출
			keys = keys.filter(key => data[key] !== '' || null);
			// table data
			const ingredients = keys.map((_, idx) => ({
				no: idx + 1,
				ingredient: data[`strIngredient${idx + 1}`], // data[key]
				measure: data[`strMeasure${idx + 1}`]
			}));
			setTableData(ingredients);
			console.log(data);
			// list data
			const instructions = data.strInstructions
				.split('\r\n') // 기존문자열에서 \r\n를 구분자로 문자열을 배열로 나눔
				.map(txt => (txt.includes('.\t') ? txt.split('.\t')[1] : txt)) // 문자열 배열에서 .\t포함되어 있다면 해당 기호를 빼고 분리
				.filter(txt => txt !== ''); // 분리된 배열에서 빈문자열이 있으면 제거
			setListData(instructions);
			console.log(instructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{isSuccess && (
				<>
					<h1>{data.strMeal}</h1>
					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
					<TableY data={TableData} title='Ingredients' className={clsx(styles.detailTable)} />
					<List data={ListData} tagName='ol' className={clsx(styles.detailList)} />
				</>
			)}
		</section>
	);
}
