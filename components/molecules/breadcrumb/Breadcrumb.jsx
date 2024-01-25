import clsx from 'clsx';
import styles from './breadcrumb.module.scss';
import Text from '@/components/atoms/text/Text';
import React from 'react';
import { useRouter } from 'next/router';

export default function Breadcrumb({ divider = '/' }) {
	const router = useRouter();
	const pathArr = router.asPath.split('/');
	// path값에서 만약 쿼리스트링값이 있으면 쿼리의 name값만 따로 추출해서 recipeName에 담아줌
	const { name: recipeName } = router.query;
	console.log(recipeName);

	// 인수로 변환할 문자원본과 특수문자를 받아서 특수문자 제거뒤 Capitalize해서 반환하는 함수(화면에 출력될 메뉴명에 활용)
	const customText = (txt, spc) => {
		txt = txt.includes(spc)
			? txt
					.split(spc)
					.map(el => el.charAt(0).toUpperCase() + el.slice(1))
					.join(' ')
			: txt;
		return txt;
	};

	return (
		<nav className={clsx(styles.breadcrumb)}>
			{pathArr.map((name, idx) => {
				// displayName = 화면에 출력용도로만 활용되는 텍스트 (해당 값을 로직을 연산하는 부분에 활용금지)
				const displayName = customText(name, '-');
				return (
					<React.Fragment key={idx}>
						<Text
							tagName={idx === pathArr.length - 1 ? 'strong' : 'em'}
							isOn={idx === pathArr.length - 1}
							url={!(idx === pathArr.length - 1) && '/' + name}>
							{/* 마지막 path경로일때 recipeName라는 쿼리값이 있으면 해당 값을 breadcrumb에 출력 없으면 걍 마지막 path경로명 출력 */}
							{idx === pathArr.length - 1 ? (recipeName ? recipeName : displayName) : name === '' ? 'Home' : displayName}
						</Text>
						{!(idx === pathArr.length - 1) && <span> {divider} </span>}
					</React.Fragment>
				);
			})}
		</nav>
	);
}
