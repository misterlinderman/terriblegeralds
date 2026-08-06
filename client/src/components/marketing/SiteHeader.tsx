import { useEffect, useState } from 'react';
import Marquee from './Marquee';
import NavBar from './NavBar';
import NextAppearanceBar from './NextAppearanceBar';
import { SITE_LINKS, SITE_SOCIALS } from './siteChrome';
import { fetchNextEvent, formatNextAppearanceInfo } from '../../services/contentApi';

interface SiteHeaderProps {
  active?: string;
  showMarquee?: boolean;
  showNextBar?: boolean;
  nextBarInfo?: string;
}

export default function SiteHeader({
  active = '',
  showMarquee = true,
  showNextBar = true,
  nextBarInfo,
}: SiteHeaderProps) {
  const [appearanceInfo, setAppearanceInfo] = useState(nextBarInfo);

  useEffect(() => {
    if (nextBarInfo) {
      setAppearanceInfo(nextBarInfo);
      return;
    }
    fetchNextEvent()
      .then((event) => {
        if (event) {
          setAppearanceInfo(formatNextAppearanceInfo(event));
        }
      })
      .catch((error) => console.error('Failed to load next event:', error));
  }, [nextBarInfo]);

  return (
    <>
      {showMarquee && (
        <Marquee
          items={[
            'WOOD FIRED',
            'GET WEIRD',
            'EAT PIZZA',
            'UNORTHODOX NEAPOLITAN',
            'OMAHA, NE',
            'SEASON 3 · VOL. 6',
          ]}
        />
      )}
      <NavBar
        logoSrc="/images/tg-logo.webp"
        logoVariant="wordmark"
        links={SITE_LINKS}
        socials={SITE_SOCIALS}
      />
      {active && (
        <style>{`
          .gerald-nav-links a[href="${active}"] { color: var(--red) !important; }
          .gerald-nav-links a[href="${active}"]::after {
            content: "";
            display: block;
            height: 2.5px;
            background: var(--red);
            margin-top: 3px;
          }
        `}</style>
      )}
      {showNextBar && (
        <NextAppearanceBar
          info={appearanceInfo ?? 'No upcoming stops posted yet — see /events'}
        />
      )}
    </>
  );
}
