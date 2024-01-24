import clsx from 'clsx';
import styles from './breadcrumb.module.scss';
import Text from '@/components/atoms/text/Text';
import React from 'react';
import { useRouter } from 'next/router';

export default function Breadcrumb({ divider = '/' }) {
  const pathArr = useRouter().asPath.split('/');
  //인수로 변환할 문자원본과 특수문자를 받아서 특수문자 제거뒤 Capitalize해서 반환하는 함수(화면에 출력될 메뉴명에 활용)
  const customText = (txt, spc) => {
    txt = txt.includes(spc)
      ? txt
          .split(spc)
          .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
          .join(' ')
      : txt;
    return txt;
  };

  return (
    <nav className={clsx(styles.breadcrumb)}>
      {pathArr.map((name, idx) => {
        //displayName = 화면에 출력용도로만 활용되는 텍스트 (해당 값을 로직을 연산하는 부분에 활용금지)
        const displayName = customText(name, '-');
        if (idx === pathArr.length - 1) {
          return (
            <Text key={idx} tagName={'strong'} isOn>
              {displayName}
            </Text>
          );
        } else {
          return (
            <React.Fragment key={idx}>
              <Text tagName={'em'} url={'/' + name}>
                {name === '' ? 'Home' : displayName}
              </Text>
              <span> {divider} </span>
            </React.Fragment>
          );
        }
      })}
    </nav>
  );
}
