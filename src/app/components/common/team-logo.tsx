import { memo } from 'react';
import Image from 'next/image';

import kiaLogo from '@/public/assets/png-logo/kia.png';
import ktLogo from '@/public/assets/png-logo/kt.png';
import lgLogo from '@/public/assets/png-logo/lg.png';
import mbcLogo from '@/public/assets/logo/mbc.webp';
import ncLogo from '@/public/assets/png-logo/nc.png';
import obLogo from '@/public/assets/png-logo/ob.png';
import skLogo from '@/public/assets/png-logo/sk.png';
import ssgLogo from '@/public/assets/png-logo/ssg.png';
import nexenLogo from '@/public/assets/png-logo/nexen.png';
import doosanLogo from '@/public/assets/png-logo/doosan.png';
import lotteLogo from '@/public/assets/png-logo/lotte.png';
import bingLogo from '@/public/assets/png-logo/binggrae.png';
import sammiLogo from '@/public/assets/logo/sammi.webp';
import samsungLogo from '@/public/assets/png-logo/samsung.png';
import ssangLogo from '@/public/assets/logo/sbw.webp';
import chungboLogo from '@/public/assets/logo/chungbo.webp';
import kiwoomLogo from '@/public/assets/png-logo/kiwoom.png';
import taeLogo from '@/public/assets/logo/pacific.webp';
import hanwhaLogo from '@/public/assets/png-logo/hanwha.png';
import haitaiLogo from '@/public/assets/png-logo/haitai.png';
import hyundaiLogo from '@/public/assets/png-logo/hyundai.png';

import { TeamId } from '@/app/stores/team/types';

function TeamLogo({ teamId }: { teamId: TeamId }) {
  const logoList = {
    KIA: kiaLogo,
    kt: ktLogo,
    LG: lgLogo,
    MBC: mbcLogo,
    NC: ncLogo,
    OB: obLogo,
    SK: skLogo,
    SSG: ssgLogo,
    넥센: nexenLogo,
    두산: doosanLogo,
    롯데: lotteLogo,
    빙그레: bingLogo,
    삼미: sammiLogo,
    삼성: samsungLogo,
    쌍방울: ssangLogo,
    청보: chungboLogo,
    키움: kiwoomLogo,
    태평양: taeLogo,
    한화: hanwhaLogo,
    해태: haitaiLogo,
    현대: hyundaiLogo,
  };

  return (
    <Image src={logoList[teamId]} alt='logo' sizes='200px' fill placeholder='blur' style={{ objectFit: 'contain' }} />
  );
}

export default memo(TeamLogo);
