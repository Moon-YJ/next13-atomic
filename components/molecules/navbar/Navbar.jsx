import clsx from 'clsx';
import styles from './navbar.module.scss';
import List from '@/components/atoms/list/List';
import { useRouter } from 'next/router';

export default function Navbar({ data }) {
	//내부적으로 현재페이지의 path이름 찾음
	const pathArr = useRouter().asPath.split('/');
	const currentPath = pathArr[pathArr.length - 1];

	//전달된 출력용 메뉴배열을 다시 라우터링크용 배열로 변환해서 반환
	const urls = data.map(el => '/' + el.toLowerCase().split(' ').join('-'));
	console.log(currentPath, '::path');
	console.log(urls, '::url');

	return (
		//출력용 메뉴배열, 라우터설정용 링크배열, 활성화되야 되는 라우터명 전달
		<List data={data} url={urls} className={clsx(styles.navbar)} currentPath={currentPath} />
	);
}
