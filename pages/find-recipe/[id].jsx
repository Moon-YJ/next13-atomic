import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import styles from './detail.module.scss';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';
import List from '@/components/atoms/list/List';
import Text from '@/components/atoms/text/Text';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { ClipLoader } from 'react-spinners';

/*
	- 다이나믹 라우터 "페이지 컴포넌트(특히 CSR방식으로 동작하는 컴포넌트)"에서 페이지 변경될때 props 오류 뜨는 이유와 해결방법
		1. 원인
			: 기본적으로 next는 라우터로 path명이 변경될때마다 언마운트되는 컴포넌트에서 CSR방식으로 가져온 데이터와 styleNode를 물리적으로 제거
			: AnimatePresence에서 트리거 조건을 router의 path명 변경으로 설정했기 때문에 router path는 이미 변경됐지만 모션이 끝날때까지 해당 페이지 컴포넌트의 언마운트 시점을 지연시킴(이미 path는 변경돼서 CSR 데이터와 styleNode는 이미 제거됐는데 page 컴포넌트가 보여서 생기는 이슈)
		2. 해결방법
			: CSR방식으로 가져오는 데이터 자체를 컴포넌트 랜더링의 조건으로 설정
			: ex. 만약 데이터가 없으면 로딩바를 대신 출력하고, 데이터가 있으면 데이터를 활용하는 컴포넌트를 출력
*/

export default function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);
	// 해당 값의 유무에 따라 즐겨찾기 있는지 확인
	const [Saved, setSaved] = useState(false);

	// 즐겨찾기 버튼 토글시 로컬저장소에 params로 들어온 레시피 아이디값을 저장해주는 함수
	const handleAdd = () => {
		const savedRecipe = JSON.parse(localStorage.getItem('favorite')) || [];
		if (!Saved) {
			savedRecipe.push(data.idMeal);
			localStorage.setItem('favorite', JSON.stringify(savedRecipe));
			setSaved(true);
		} else {
			// Array.splice(삭제할 배열의 위치 순번, 삭제할 개수)
			savedRecipe.splice(savedRecipe.indexOf(data.idMeal), 1);
			localStorage.setItem('favorite', JSON.stringify(savedRecipe));
			setSaved(false);
		}
	};

	// 사용자 이벤트가 아닌 해당 페이지컴포넌트가 마운트시 로컬저장소의 값을 비교해서 즐겨찾기버튼 상태 변경
	useEffect(() => {
		const savedRecipe = JSON.parse(localStorage.getItem('favorite')) || [];
		savedRecipe.includes(id) ? setSaved(true) : setSaved(false);
	}, [id]);

	useEffect(() => {
		if (data) {
			// key값을 뽑아서
			let keys = Object.keys(data);
			// strIngredient로 시작하는 key값만 추출
			keys = keys.filter(key => key.startsWith('strIngredient'));
			// 그중에서 value값이 있는 key값만 다시 추출
			keys = keys.filter(key => data[key] !== '' || null);
			// table data
			const ingredients = keys.map((_, idx) => ({
				no: idx + 1,
				ingredient: data[`strIngredient${idx + 1}`], // data[key]
				measure: data[`strMeasure${idx + 1}`]
			}));
			setTableData(ingredients);
			console.log(data);
			// list data
			const instructions = data.strInstructions
				.split('\r\n') // 기존문자열에서 \r\n를 구분자로 문자열을 배열로 나눔
				.map(txt => (txt.includes('.\t') ? txt.split('.\t')[1] : txt)) // 문자열 배열에서 .\t포함되어 있다면 해당 기호를 빼고 분리
				.filter(txt => txt !== ''); // 분리된 배열에서 빈문자열이 있으면 제거
			setListData(instructions);
			console.log(instructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{/* CSR 방식으로 가져오는 데이터가 없을때에는 로딩바를 대신 출력 */}
			<ClipLoader
				loading={!data}
				cssOverride={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)' }}
				color='var(--point)'
				size={50}
			/>
			{/* data가 있을때에만 컨텐츠 출력 */}
			{data && (
				<>
					<div className={clsx(styles.top)}>
						<h1>{data.strMeal}</h1>
						<Text styleType='button' onClick={handleAdd}>
							{Saved ? <IoMdHeart /> : <IoMdHeartEmpty />}
						</Text>
					</div>
					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
					<TableY data={TableData} title='Ingredients' className={clsx(styles.detailTable)} />
					<List data={ListData} tagName='ol' className={clsx(styles.detailList)} />
				</>
			)}
		</section>
	);
}
