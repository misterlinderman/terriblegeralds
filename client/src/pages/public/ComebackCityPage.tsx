export default function ComebackCityPage() {
  return (
    <div className="container ccp-rounded-mask d-grid">
      <div className="ccp-logo">
        <img src="/images/ccp-logo.svg" alt="Comeback City Pizza logo" />
      </div>
      <div className="hero-ribbon d-grid">
        <div className="coming-soon">
          <h1>Coming Soon!</h1>
          <ul className="social-list">
            <li>
              <a href="https://www.facebook.com/profile.php?id=61567878444411" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/comebackcitypizza/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="left-bg-image">
        <img src="/images/ccp-pizza-left-side.webp" alt="A Comeback City pizza!" />
      </div>
      <div className="right-bg-image">
        <img src="/images/ccp-pizza-right-side.webp" alt="Another Comeback City pizza!" />
      </div>
    </div>
  );
}
