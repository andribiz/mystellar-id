import React from 'react';
import Link from 'next/link';
import { siteConfig } from '../../data/index';
import Logo from '../../assets/image/logo-kecil.png';
import LogoName from '../../assets/image/logo-sidebar.png';

export default function({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            {/*<i className={siteConfig.siteIcon} />*/}
            <img src={Logo} />
          </h3>
        </div>
      ) : (
        <h3>
          {/*<Link href="/">*/}
          {/*<a>{siteConfig.siteName}</a>*/}
          <img src={LogoName} />
          {/*</Link>*/}
        </h3>
      )}
    </div>
  );
}
