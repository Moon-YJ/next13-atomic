import clsx from 'clsx';
import styles from './layout.module.scss';
import Header from '@/components/organisms/header/Header';
import Breadcrumb from '@/components/molecules/breadcrumb/Breadcrumb';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalData } from '@/hooks/useGlobalContext';
import Footer from '@/components/organisms/footer/Footer';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum'
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '600'],
	preload: true,
	variable: '--font-orbitron'
});

export default function Layout({ children }) {
	const router = useRouter();
	const { Theme } = useGlobalData();
	return (
		// mode='wait' => 동작되고 있는 모션 컴포넌트가 있으면 해당 모션이 끝날때까지 unmount를 지연해서 사라지는 모션 시간 확보
		<AnimatePresence mode='wait'>
			{/* router 변경을 감지하는 모션 컴포넌트 */}
			<motion.div key={router.pathname}>
				<div className={clsx(styles.layout, nanum.variable, orbitron.variable, Theme)}>
					<Header />
					<div className={clsx(styles.content)}>
						{router.asPath !== '/' && <Breadcrumb />}
						{children}
					</div>
					{/* router 변경할때마다 모션을 적용할 박스 요소 */}
					{/* 패널이 안보이다가 왼쪽에서 오른쪽으로 늘어나는 모션 컴포넌트 */}
					<motion.div className='in' initial={{ scaleX: 0 }} animate={{ scaleX: 0 }} exit={{ scaleX: 1 }} transition={{ duration: 0.5 }}></motion.div>
					{/* 패널이 보이다가 오른쪽으로 사라지는 모션 컴포넌트 */}
					<motion.div
						className='out'
						initial={{ scaleX: 1 }}
						animate={{ scaleX: 0 }}
						exit={{ scaleX: 0 }}
						transition={{ duration: 0.5 }}></motion.div>

					{/* scaleY 모션 */}
					{/* <motion.div className='in' initial={{ scaleY: 0 }} animate={{ scaleY: 0 }} exit={{ scaleY: 1 }} transition={{ duration: 0.5 }}></motion.div>
					<motion.div className='out' initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} exit={{ scaleY: 0 }} transition={{ duration: 0.5 }}></motion.div> */}
					<Footer />
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
