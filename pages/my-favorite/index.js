import clsx from 'clsx';
import styles from './my-favorite.module.scss';

export default function MyFavorite() {
	return (
		<section className={clsx(styles.myFavorite)}>
			<h1>My Favorite</h1>
		</section>
	);
}
