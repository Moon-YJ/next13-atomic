import clsx from 'clsx';
import styles from './layout.module.scss';
import Header from '@/components/organisms/header/Header';
import Breadcrumb from '@/components/molecules/breadcrumb/Breadcrumb';

export default function Layout({ children }) {
	return (
		<main className={clsx(styles.layout)}>
			<Header />
			<Breadcrumb />
			{children}
		</main>
	);
}
