import clsx from 'clsx';
import styles from './visual.module.scss';
import SwiperWrap from '@/components/molecules/swiper/Swiper';

export default function Visual({ dataArr }) {
	return (
		<figure className={clsx(styles.visual)}>
			<SwiperWrap dataArr={dataArr} breakpoints={{ 1200: { slidesPerView: 3, spaceBetween: 50 } }} />
		</figure>
	);
}
