import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import Text from '@/components/atoms/text/Text';
import styles from './swiper.module.scss';

SwiperCore.use([Autoplay]);

function SwiperWrap({ dataArr, delay = 2000, perView = 1, className, breakpoints, setIndex }) {
	return (
		<>
			<Swiper
				className={clsx(styles.swiper, className)}
				modules={[Autoplay]}
				autoplay={{ delay: delay, disableOnInteraction: true }}
				loop={true}
				grabCursor={true}
				slidesPerView={perView}
				spaceBetween={100}
				centeredSlides={true}
				breakpoints={breakpoints}
				onSlideChange={el => setIndex(el.realIndex)}>
				{dataArr.map((item, idx) => (
					<SwiperSlide key={idx} className={clsx(styles.swiperSlide)}>
						{({ isActive, isPrev, isNext }) => {
							return (
								<div className={clsx(isActive && styles.on, isPrev && styles.prev, isNext && styles.next)}>
									<Text tagName={'h3'} className={clsx(styles.tit)}>
										{item.strMeal.length > 25 ? item.strMeal.substr(0, 25) : item.strMeal}
									</Text>
									<Text className={clsx(styles.activeBtn)} url={`/find-recipe/${item.idMeal}?name=${item.strMeal}`}>
										View Recipe
									</Text>
								</div>
							);
						}}
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}

export default SwiperWrap;
