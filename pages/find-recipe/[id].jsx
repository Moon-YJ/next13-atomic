import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import styles from './detail.module.scss';

export default function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	console.log(data);

	return (
		<section className={clsx(styles.detail)}>
			{isSuccess && (
				<>
					<h1>{data.strMeal}</h1>
					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
				</>
			)}
		</section>
	);
}
