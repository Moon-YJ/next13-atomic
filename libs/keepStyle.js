import Router from 'next/router';

export const keepStyle = delay => {
	// Router의 path값이 변경되는 것을 감지하는 이벤트
	Router.events.on('beforeHistoryChange', () => {
		const nodes = document.querySelectorAll('link[rel=stylesheet], style');
		const copies = [...nodes].map(el => el.cloneNode(true));

		for (let copy of copies) {
			//copy.removeAttribute('data-n-g');
			//copy.removeAttribute('data-n-href');
			copy.removeAttribute('data-n-p');
			copy.removeAttribute('media');
			document.head.appendChild(copy);
		}
		const handler = () => {
			Router.events.off('routeChangeComplete', handler);
			window.setTimeout(() => {
				for (let copy of copies) {
					document.head.removeChild(copy);
				}
			}, delay);
		};
		Router.events.on('routeChangeComplete', handler);
	});
};
