import Pic from '@/components/atoms/pic/Pic';
import styles from './slider.module.scss';
import clsx from 'clsx';

function Slider({ dataArr, index, className }) {
	return (
		<article className={clsx(styles.slider, className)}>
			{dataArr.map((el, idx) => (
				<Pic key={idx} imgSrc={el.strMealThumb} className={clsx(idx === index ? styles.on : '')} />
			))}
		</article>
	);
}

export default Slider;
