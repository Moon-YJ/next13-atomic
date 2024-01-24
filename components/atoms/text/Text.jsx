import clsx from 'clsx';
import styles from './text.module.scss';
import React from 'react';
import Link from 'next/link';

export default function Text({ children, url, tagName = 'p', styleType, className, isOn, onClick }) {
	return React.createElement(
		tagName,
		{
			onClick: onClick,
			className: clsx(styles.text, styles[styleType], className, isOn && styles.on)
		},
		url ? React.createElement(Link, { href: url }, children) : children
	);
}
