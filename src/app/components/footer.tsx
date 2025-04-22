export const dynamic = 'force-dynamic';

import { redis } from '@/app/lib/kv';

const Footer = async () => {
  const now = new Date();
  const koreaNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const today = koreaNow.toISOString().slice(0, 10);
  const todayKey = `visitor_count:${today}`;
  const todayCount = await redis.incr(todayKey);
  const totalCount = await redis.incr('total_visitor_count');

  await redis.expire(todayKey, 60 * 60 * 24 * 30);

  return (
    <div className='mx-auto flex max-w-[700px] justify-between gap-3 mobileL:flex-col mobileL:items-end laptop:max-w-[1000px]'>
      <div className='h-20'>
        <img
          src={`https://img.shields.io/badge/visit-${todayCount}_/_${totalCount}-%23CC7820?style=flat-square&logo=v&logoColor=white&labelColor=gray`}
          alt='visitor'
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
