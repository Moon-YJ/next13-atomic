import clsx from 'clsx';
import styles from './find-recipe.module.scss';
import Layout from '@/components/template/layout/Layout';

export default function FindRecipe() {
	return (
		<section className={clsx(styles.findRecipe)}>
			<h1>Find Recipe</h1>
		</section>
	);
}
