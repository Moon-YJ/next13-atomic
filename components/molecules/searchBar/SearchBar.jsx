import clsx from 'clsx';
import styles from './searchBar.module.scss';
import Input from '@/components/atoms/input/Input';
import { RiSearchLine } from 'react-icons/ri';

export default function SearchBar({ value, onChange, className, placeholder }) {
	return (
		<div className={clsx(styles.searchBar, className)}>
			<Input value={value} onChange={onChange} placeholder={placeholder} />
			<button>
				<RiSearchLine />
			</button>
		</div>
	);
}
