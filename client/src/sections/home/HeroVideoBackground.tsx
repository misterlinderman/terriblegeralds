import { useEffect, useState } from 'react';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import { HERO_VIDEO_URL } from '../../config/heroMedia';

export default function HeroVideoBackground() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let cancelled = false;

    fetch(HERO_VIDEO_URL, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && res.ok) setShowVideo(true);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={() => setShowVideo(false)}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      ) : (
        <PlaceholderBox
          dark
          style={{ position: 'absolute', inset: 0, borderRadius: 0, border: 'none' }}
        >
          ▶ HERO REEL GOES HERE
          <br />
          (autoplay · muted · looped)
          <br />
          truck • flames • dough pulls
        </PlaceholderBox>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg,rgba(15,11,7,.92) 0%,rgba(15,11,7,.6) 50%,rgba(15,11,7,.25) 100%)',
        }}
      />
    </>
  );
}
