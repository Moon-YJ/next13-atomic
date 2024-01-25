import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import styles from './detail.module.scss';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';

export default function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);

	useEffect(() => {
		if (data) {
			// key값을 뽑아서
			let keys = Object.keys(data);
			// strIngredient로 시작하는 key값만 추출
			keys = keys.filter(key => key.startsWith('strIngredient'));
			// 그중에서 value값이 있는 key값만 다시 추출
			keys = keys.filter(key => data[key] !== '' || null);

			const ingredients = keys.map((_, idx) => ({
				no: idx + 1,
				ingredient: data[`strIngredient${idx + 1}`], // data[key]
				measure: data[`strMeasure${idx + 1}`]
			}));
			setTableData(ingredients);
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
				</>
			)}
		</section>
	);
}
