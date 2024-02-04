import clsx from 'clsx';
import styles from './pic.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { HashLoader } from 'react-spinners';
import { useState } from 'react';
//import { useThemeColor } from '@/hooks/useThemeColor';

//npm i react-spinners

export default function Pic({ imgSrc, imgTxt, url, className }) {
	const [IsLoaded, setIsLoaded] = useState(false);
	//const {point} = useThemeColor();

	return (
		<div className={clsx(styles.pic, imgTxt && styles.picTxt, className)}>
			<Image
				src={imgSrc}
				alt={imgSrc}
				priority
				fill
				sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw,33vw'
				onLoadingComplete={() => setIsLoaded(true)}
			/>
			{imgTxt && <h2>{imgTxt}</h2>}
			{url && <Link href={url}></Link>}
			<HashLoader
				size={50}
				color='var(--point)'
				//color={point}
				loading={!IsLoaded}
				cssOverride={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}}
			/>
		</div>
	);
}
