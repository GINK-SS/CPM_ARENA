import * as S from './styles';

const Footer = () => {
  return (
    <S.Container>
      <S.Badge>
        <img
          src='https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fwww.cpm-arena.com&count_bg=%23D17407&title_bg=%235E5E5E&icon=angellist.svg&icon_color=%23E7E7E7&title=visits&edge_flat=true'
          alt='visits'
          height={20}
        />
      </S.Badge>

      <S.Badge>
        <img
          alt='Static Badge'
          src='https://img.shields.io/badge/contact-gink.ss00%40gmail.com-%23CC7820?style=flat-square&logo=gmail&logoColor=white&labelColor=gray'
          height={20}
        />
      </S.Badge>
    </S.Container>
  );
};

export default Footer;
