import * as S from './styles';

const Footer = () => {
  return (
    <S.Container>
      <img
        alt='Static Badge'
        src='https://img.shields.io/badge/%C2%A9_2024-GINK--SS-gray?style=flat-square&labelColor=gray'
      />

      <a href='https://hits.seeyoufarm.com'>
        <img
          src='https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fwww.cpm-arena.com&count_bg=%23D17407&title_bg=%235E5E5E&icon=angellist.svg&icon_color=%23E7E7E7&title=hits&edge_flat=true'
          alt='hits'
        />
      </a>
    </S.Container>
  );
};

export default Footer;
