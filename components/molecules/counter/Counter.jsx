import Text from '@/components/atoms/text/Text';
import styles from './counter.module.scss';
import clsx from 'clsx';

function Counter({ index, len, className }) {
	return (
		<div className={clsx(styles.counter, className)}>
			<Text tagName={'strong'}>{index < 10 ? '0' + (index + 1) : index + 1}</Text>
			<Text tagName={'span'}>/ {len < 10 ? '0' + len : len}</Text>
		</div>
	);
}

export default Counter;
