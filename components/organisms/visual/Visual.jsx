import clsx from 'clsx';
import styles from './visual.module.scss';
import Text from '@/components/atoms/text/Text';
import { useState } from 'react';
import Counter from '@/components/molecules/counter/Counter';
import SwiperWrap from '@/components/molecules/swiper/Swiper';

export default function Visual({ dataArr, category }) {
	const [Index, setIndex] = useState(0);

	return (
		<figure className={clsx(styles.visual)}>
			<Text className={clsx(styles.categoryTit)}>{category}</Text>
			<Counter className={clsx(styles.counter)} index={Index} len={dataArr.length} />
			<SwiperWrap dataArr={dataArr} breakpoints={{ 1200: { slidesPerView: 3, spaceBetween: 50 } }} setIndex={setIndex} />
		</figure>
	);
}
