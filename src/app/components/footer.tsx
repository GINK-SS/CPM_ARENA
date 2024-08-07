const Footer = () => {
  return (
    <div className='mx-auto flex max-w-[700px] justify-between gap-3 mobileL:flex-col mobileL:items-end laptop:max-w-[1000px]'>
      <div className='h-20'>
        <img
          src='https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fwww.cpm-arena.com&count_bg=%23D17407&title_bg=%235E5E5E&icon=angellist.svg&icon_color=%23E7E7E7&title=visits&edge_flat=true'
          alt='visits'
          height={20}
        />
      </div>

      <div className='h-20'>
        <img
          src='https://img.shields.io/badge/contact-gink.ss00%40gmail.com-%23CC7820?style=flat-square&logo=gmail&logoColor=white&labelColor=gray'
          alt='contact'
          height={20}
        />
      </div>
    </div>
  );
};

export default Footer;
