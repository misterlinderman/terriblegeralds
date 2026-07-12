/* @ds-bundle: {"format":4,"namespace":"TerribleGeraldSDesignSystem_d3d4e8","components":[{"name":"FeatureCard","sourcePath":"components/cards/FeatureCard.jsx"},{"name":"PizzaCard","sourcePath":"components/cards/PizzaCard.jsx"},{"name":"QuoteCard","sourcePath":"components/cards/QuoteCard.jsx"},{"name":"ScheduleCard","sourcePath":"components/cards/ScheduleCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"PlaceholderBox","sourcePath":"components/core/PlaceholderBox.jsx"},{"name":"Stamp","sourcePath":"components/core/Stamp.jsx"},{"name":"NewsletterForm","sourcePath":"components/forms/NewsletterForm.jsx"},{"name":"SectionHeader","sourcePath":"components/layout/SectionHeader.jsx"},{"name":"TapeStrip","sourcePath":"components/layout/TapeStrip.jsx"},{"name":"TornDivider","sourcePath":"components/layout/TornDivider.jsx"},{"name":"Marquee","sourcePath":"components/navigation/Marquee.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"NextAppearanceBar","sourcePath":"components/navigation/NextAppearanceBar.jsx"}],"sourceHashes":{"components/cards/FeatureCard.jsx":"e623b48577be","components/cards/PizzaCard.jsx":"316d83fab169","components/cards/QuoteCard.jsx":"12e274ee7431","components/cards/ScheduleCard.jsx":"8963c94a87db","components/core/Badge.jsx":"f4065e31cbf6","components/core/Button.jsx":"2afa8e695ce8","components/core/PlaceholderBox.jsx":"9a504950c05a","components/core/Stamp.jsx":"0c90d4b49696","components/forms/NewsletterForm.jsx":"4f9cdf7763a9","components/layout/SectionHeader.jsx":"fbdfc03a85c5","components/layout/TapeStrip.jsx":"6c44a0a20d1c","components/layout/TornDivider.jsx":"205fc4988898","components/navigation/Marquee.jsx":"dc24e2c01333","components/navigation/NavBar.jsx":"9a4a0b7fcfce","components/navigation/NextAppearanceBar.jsx":"dca8bbebf45b","ui_kits/marketing-site/AboutSection.jsx":"a85109de319d","ui_kits/marketing-site/CateringSection.jsx":"f4c8e6e97fe3","ui_kits/marketing-site/Footer.jsx":"4ddb3801e2dd","ui_kits/marketing-site/Hero.jsx":"94d8be66438e","ui_kits/marketing-site/NewsletterSection.jsx":"653b0d818153","ui_kits/marketing-site/PizzaSection.jsx":"1c6a0867d1c4","ui_kits/marketing-site/ReviewsSection.jsx":"2301e43579b4","ui_kits/marketing-site/ScheduleSection.jsx":"2773a4831277","ui_kits/marketing-site/TestimonialsSection.jsx":"74ae25ab7129","ui_kits/marketing-site/VenuesSection.jsx":"dacea0664c32","ui_kits/marketing-site/WallSection.jsx":"b9518db0f759"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TerribleGeraldSDesignSystem_d3d4e8 = window.TerribleGeraldSDesignSystem_d3d4e8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/QuoteCard.jsx
try { (() => {
const tones = {
  cream: {
    background: 'var(--cream)',
    color: 'var(--ink)',
    border: '2px solid var(--ink)',
    rotate: -1
  },
  ink: {
    background: 'var(--ink)',
    color: 'var(--cream)',
    rotate: 1.2
  },
  red: {
    background: 'var(--red)',
    color: 'var(--cream)',
    rotate: .6
  },
  teal: {
    background: 'var(--teal)',
    color: 'var(--cream)',
    rotate: -1.4
  }
};

/** Tilted pull-quote / testimonial card in the editorial serif, italic, with attribution line. */
function QuoteCard({
  tone = 'cream',
  quote = '"I drove 45 minutes for this pizza."',
  source = 'a reasonable person',
  style
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      borderRadius: 8,
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: '1.02rem',
      background: t.background,
      color: t.color,
      border: t.border,
      transform: `rotate(${t.rotate}deg)`,
      ...style
    }
  }, quote, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: '.74rem',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      marginTop: 10,
      opacity: .8
    }
  }, "\u2014 ", source));
}
Object.assign(__ds_scope, { QuoteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ScheduleCard.jsx
try { (() => {
/** Weekly truck schedule list — ink header bar + rows, current stop highlighted in gold. */
function ScheduleCard({
  heading = '📍 May 30 – June 6',
  rows = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cream)',
      border: '2.5px solid var(--ink)',
      borderRadius: 8,
      boxShadow: 'var(--shadow-soft)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)',
      color: 'var(--cream)',
      padding: '14px 20px',
      fontFamily: 'var(--font-display)',
      letterSpacing: '.04em',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, heading), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '64px 1fr auto',
      gap: 14,
      alignItems: 'center',
      padding: '15px 20px',
      borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--paper-line)',
      background: r.now ? 'rgba(232,161,30,.22)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.15rem',
      color: 'var(--red)'
    }
  }, r.day, /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '.7rem',
      color: 'var(--ink-soft)'
    }
  }, r.date)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, r.venue, /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontWeight: 500,
      fontSize: '.78rem',
      color: 'var(--ink-soft)'
    }
  }, r.address)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '.85rem',
      background: r.now ? 'var(--red)' : 'var(--ink)',
      color: 'var(--cream)',
      padding: '4px 9px',
      borderRadius: 3,
      whiteSpace: 'nowrap'
    }
  }, r.time))));
}
Object.assign(__ds_scope, { ScheduleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ScheduleCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/** Pill badge — italic New Spirit on a solid fill, slight rotation (season tags, CTAs). */
function Badge({
  children,
  tone = 'red',
  rotate = -3,
  style
}) {
  const tones = {
    red: {
      background: 'var(--red)',
      color: 'var(--cream)'
    },
    ink: {
      background: 'var(--ink)',
      color: 'var(--cream)'
    },
    gold: {
      background: 'var(--gold)',
      color: 'var(--ink)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontSize: '.8rem',
      padding: '4px 13px',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-block',
      transform: `rotate(${rotate}deg)`,
      ...tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'red',
  size = 'md',
  href,
  onClick,
  children,
  disabled = false,
  style
}) {
  const base = {
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
    letterSpacing: '.04em',
    fontSize: size === 'sm' ? '.82rem' : '1rem',
    padding: size === 'sm' ? '9px 16px' : '15px 26px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    borderRadius: 3,
    transition: '.16s',
    textDecoration: 'none',
    opacity: disabled ? .5 : 1,
    ...style
  };
  const variants = {
    red: {
      background: 'var(--red)',
      color: 'var(--cream)',
      boxShadow: 'var(--offset-shadow) var(--red-deep)'
    },
    ink: {
      background: 'var(--ink)',
      color: 'var(--cream)',
      boxShadow: 'var(--offset-shadow) rgba(0,0,0,.3)'
    },
    gold: {
      background: 'var(--gold)',
      color: 'var(--ink)',
      boxShadow: 'var(--offset-shadow) var(--gold-deep)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink)',
      border: '2.5px solid var(--ink)'
    },
    ghostInverse: {
      background: 'transparent',
      color: 'var(--cream)',
      border: '2.5px solid var(--cream)'
    }
  };
  const Tag = href ? 'a' : 'button';
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? variant === 'ghost' ? {
    background: 'var(--ink)',
    color: 'var(--cream)'
  } : variant === 'ghostInverse' ? {
    background: 'var(--cream)',
    color: 'var(--ink)'
  } : {
    transform: 'translate(-2px,-2px)',
    boxShadow: (variants[variant].boxShadow || '').replace('var(--offset-shadow)', 'var(--offset-shadow-hover)')
  } : {};
  return React.createElement(Tag, {
    href,
    onClick: disabled ? undefined : onClick,
    disabled,
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/PlaceholderBox.jsx
try { (() => {
/** Hatched/dashed "drop your asset here" slot — the brand's placeholder system for
 * every image/video zone until real photography/footage lands. Dark variant for dark sections. */
function PlaceholderBox({
  label = 'PHOTO',
  dark = false,
  aspect,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      aspectRatio: aspect,
      backgroundImage: dark ? 'repeating-linear-gradient(45deg,#241c14,#241c14 14px,#1c150e 14px,#1c150e 28px)' : 'repeating-linear-gradient(45deg,var(--bone-2),var(--bone-2) 14px,var(--bone) 14px,var(--bone) 28px)',
      border: dark ? '2px dashed rgba(233,220,196,.35)' : '2px dashed rgba(23,18,13,.35)',
      color: dark ? '#e9dcc4' : 'var(--ink-soft)',
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontSize: '.8rem',
      letterSpacing: '.02em',
      borderRadius: 6,
      minHeight: aspect ? undefined : 90,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      padding: '10px 12px',
      lineHeight: 1.3
    }
  }, children || label));
}
Object.assign(__ds_scope, { PlaceholderBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PlaceholderBox.jsx", error: String((e && e.message) || e) }); }

// components/cards/FeatureCard.jsx
try { (() => {
/** Press/interview feature tile — thumbnail, byline, one-line description, "Listen/Watch/Read" link. */
function FeatureCard({
  thumbLabel = '🎙 photo',
  by = 'Hoppen Interview',
  what = 'Sit-down with the homies',
  cta = '▶ Listen Now',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cream)',
      border: '2px solid var(--ink)',
      borderRadius: 8,
      padding: 16,
      textAlign: 'center',
      boxShadow: 'var(--card-shadow)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PlaceholderBox, {
    dark: true,
    label: thumbLabel,
    aspect: "16/10",
    style: {
      marginBottom: 12,
      borderRadius: 5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.05rem',
      lineHeight: 1
    }
  }, by), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '.78rem',
      color: 'var(--ink-soft)',
      margin: '4px 0 12px',
      minHeight: 32
    }
  }, what), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      color: 'var(--red)',
      fontSize: '.82rem'
    }
  }, cta));
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/PizzaCard.jsx
try { (() => {
/** Product card for a pizza — photo, tilted name plate overlapping the image, ingredient list. */
function PizzaCard({
  name = 'The Gerald',
  ingredients = 'Red sauce, mozz, pepperoni, hot honey, parm, basil',
  image,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cream)',
      border: '2px solid var(--ink)',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
      transition: '.2s',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '1'
    }
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement(__ds_scope.PlaceholderBox, {
    label: `PHOTO — ${name}`,
    style: {
      height: '100%',
      borderRadius: 0,
      border: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--red)',
      color: 'var(--cream)',
      fontFamily: 'var(--font-display)',
      letterSpacing: '.03em',
      display: 'inline-block',
      padding: '5px 11px',
      margin: '-30px 0 10px',
      position: 'relative',
      transform: 'rotate(-1.5deg)'
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '.82rem',
      color: 'var(--ink-soft)',
      textTransform: 'uppercase',
      letterSpacing: '.02em',
      fontWeight: 600,
      lineHeight: 1.45,
      margin: 0
    }
  }, ingredients)));
}
Object.assign(__ds_scope, { PizzaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PizzaCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Stamp.jsx
try { (() => {
/** Circular red-ringed stamp graphic — the brand's approval mark. */
function Stamp({
  children = 'terrible ✓',
  rotate = -9,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      color: 'var(--red)',
      border: '2.5px solid var(--red)',
      borderRadius: '50%',
      padding: '.55em .85em',
      transform: `rotate(${rotate}deg)`,
      fontSize: '.8rem',
      lineHeight: 1,
      display: 'inline-block',
      textTransform: 'uppercase',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Stamp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stamp.jsx", error: String((e && e.message) || e) }); }

// components/forms/NewsletterForm.jsx
try { (() => {
/** Email capture row — flexible input + ink submit button, matches the red "newsletter" panel. */
function NewsletterForm({
  placeholder = 'your email address',
  buttonLabel = 'Sign Me Up',
  onSubmit,
  style
}) {
  const [value, setValue] = React.useState('');
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubmit?.(value);
    },
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    placeholder: placeholder,
    value: value,
    onChange: e => setValue(e.target.value),
    style: {
      flex: 1,
      minWidth: 200,
      padding: '14px 16px',
      border: 'none',
      borderRadius: 4,
      fontFamily: 'var(--font-body)',
      fontSize: '1rem'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      fontSize: '1rem',
      padding: '15px 26px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 3,
      background: 'var(--ink)',
      color: 'var(--cream)',
      boxShadow: 'var(--offset-shadow) rgba(0,0,0,.3)'
    }
  }, buttonLabel));
}
Object.assign(__ds_scope, { NewsletterForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/NewsletterForm.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeader.jsx
try { (() => {
/** Section intro — italic red kicker line + bold uppercase display headline. */
function SectionHeader({
  kicker,
  title,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 20,
      marginBottom: 'var(--section-head-gap)',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, kicker && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      color: 'var(--red)',
      fontSize: '.95rem',
      display: 'block',
      marginBottom: 4
    }
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      textTransform: 'uppercase',
      lineHeight: .98,
      letterSpacing: 'var(--display-tracking)',
      fontSize: 'var(--text-h2)',
      margin: 0
    }
  }, title)), action);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/layout/TapeStrip.jsx
try { (() => {
/** Translucent gold tape strip graphic — decorative accent for pinning a corner of a card/photo. */
function TapeStrip({
  top = -12,
  left = 24,
  rotate = -4,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top,
      left,
      width: 84,
      height: 24,
      background: 'rgba(232,161,30,.55)',
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 2px 6px rgba(0,0,0,.15)',
      display: 'block',
      backgroundImage: 'linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)',
      ...style
    }
  });
}
Object.assign(__ds_scope, { TapeStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/TapeStrip.jsx", error: String((e && e.message) || e) }); }

// components/layout/TornDivider.jsx
try { (() => {
/** Hand-drawn torn-paper wave divider between sections — fill color matches the section it leads into. */
function TornDivider({
  color = 'var(--cream)',
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1200 26",
    preserveAspectRatio: "none",
    style: {
      display: 'block',
      width: '100%',
      height: 26,
      color,
      ...style
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M0 26 L0 12 Q40 2 80 10 T160 8 T240 14 T320 4 T400 12 T480 6 T560 14 T640 4 T720 12 T800 6 T880 14 T960 4 T1040 12 T1120 6 T1200 12 L1200 26 Z"
  }));
}
Object.assign(__ds_scope, { TornDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/TornDivider.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Marquee.jsx
try { (() => {
/** Scrolling top marquee ribbon — brand taglines separated by gold dots, infinite loop. */
function Marquee({
  items = ['WOOD FIRED', 'GET WEIRD', 'EAT PIZZA'],
  style
}) {
  const track = /*#__PURE__*/React.createElement("span", null, items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      padding: '0 22px'
    }
  }, it, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold)'
    }
  }, "\u25CF"))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)',
      color: 'var(--cream)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontSize: '.82rem',
      padding: '7px 0',
      borderBottom: '2px solid var(--red)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      animation: 'gerald-marquee var(--marquee-duration) linear infinite'
    }
  }, track, track));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Marquee.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
/** Sticky site header — logo mark + wordmark, link row, season badge, socials, mobile burger. */
function NavBar({
  logoSrc,
  links = [],
  seasonLabel = 'S3 · VOL.6',
  socials = [],
  style
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: 'var(--bone)',
      borderBottom: '2px solid var(--ink)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      padding: '14px 24px',
      maxWidth: 1180,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexShrink: 0,
      textDecoration: 'none',
      color: 'var(--ink)'
    }
  }, logoSrc && /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "logo",
    style: {
      width: 42,
      height: 42,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      lineHeight: .82
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: '.95rem',
      letterSpacing: '.06em'
    }
  }, "TERRIBLE"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      color: 'var(--red)'
    }
  }, "GERALD'S"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: '.7rem',
      letterSpacing: '.32em',
      color: 'var(--ink-soft)'
    }
  }, "PIZZA"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: open ? 'flex' : undefined,
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap'
    },
    className: "gerald-nav-links"
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href,
    style: {
      fontWeight: 700,
      fontSize: '.78rem',
      textTransform: 'uppercase',
      letterSpacing: '.06em',
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, l.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontSize: '.66rem',
      color: 'var(--cream)',
      background: 'var(--red)',
      padding: '3px 9px',
      borderRadius: 20,
      transform: 'rotate(-3deg)',
      display: 'inline-block'
    }
  }, seasonLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, socials.map((s, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: s.href || '#',
    "aria-label": s.label,
    style: {
      width: 30,
      height: 30,
      border: '2px solid var(--ink)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ink)'
    },
    dangerouslySetInnerHTML: s.svg ? {
      __html: s.svg
    } : undefined
  }, !s.svg ? s.label?.[0] : null))), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Menu",
    onClick: () => setOpen(o => !o),
    style: {
      display: 'none',
      flexDirection: 'column',
      gap: 5,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 6
    },
    className: "gerald-burger"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 3,
      background: 'var(--ink)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 3,
      background: 'var(--ink)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 3,
      background: 'var(--ink)',
      borderRadius: 2
    }
  })))));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NextAppearanceBar.jsx
try { (() => {
/** Live "where's the truck right now" bar — gold field, pulsing red dot, bold venue/time info. */
function NextAppearanceBar({
  label = 'Next Appearance',
  info = 'FRIDAY, MAY 30 · 5–9PM  •  SITE-1 BREWING  •  2566 Farnam St, Omaha, NE',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--gold)',
      borderTop: '3px solid var(--ink)',
      borderBottom: '3px solid var(--ink)',
      color: 'var(--ink)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '16px 24px',
      flexWrap: 'wrap',
      maxWidth: 1180,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.05rem',
      letterSpacing: '.04em',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: 'var(--red)',
      display: 'inline-block',
      animation: 'gerald-pulse 1.8s infinite'
    }
  }), label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: '1.02rem'
    }
  }, info)));
}
Object.assign(__ds_scope, { NextAppearanceBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NextAppearanceBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/AboutSection.jsx
try { (() => {
const {
  PlaceholderBox
} = window.TerribleGeraldSDesignSystem_d3d4e8;
const STOPS = [{
  yr: '2018',
  t: 'Bad Ideas',
  d: 'It begins, regrettably.'
}, {
  yr: '2019',
  t: 'First Truck',
  d: 'Wheels acquired.'
}, {
  yr: '2020',
  t: 'Gerald Is Born',
  d: 'A face for the chaos.'
}, {
  yr: '2021',
  t: "Gettin' Weird",
  d: 'Names get worse. Pies get better.'
}, {
  yr: 'NOW',
  t: 'Terrible Legend',
  d: 'Season 3 · Vol. 6.'
}];
function AboutSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '74px 0',
      background: 'var(--cream)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      color: 'var(--red)',
      fontSize: '.95rem',
      display: 'block',
      marginBottom: 4
    }
  }, "how we got terrible"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(2rem,4.4vw,3.3rem)',
      margin: '0 0 34px'
    }
  }, "The Story of Gerald"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 8
    },
    className: "gerald-timeline"
  }, STOPS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(PlaceholderBox, {
    label: s.yr === 'NOW' ? 'now' : 'art',
    style: {
      width: 78,
      height: 78,
      borderRadius: '50%',
      margin: '0 auto 14px',
      border: '3px solid var(--ink)',
      fontSize: '.62rem'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      color: 'var(--red)',
      fontSize: '1.1rem'
    }
  }, s.yr), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      textTransform: 'uppercase',
      fontSize: '.78rem',
      letterSpacing: '.04em'
    }
  }, s.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '.78rem',
      color: 'var(--ink-soft)',
      marginTop: 4
    }
  }, s.d))))));
}
window.AboutSection = AboutSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/AboutSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/CateringSection.jsx
try { (() => {
const {
  PlaceholderBox,
  Button
} = window.TerribleGeraldSDesignSystem_d3d4e8;
function CateringSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '74px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 40,
      alignItems: 'center'
    },
    className: "gerald-cater"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(PlaceholderBox, {
    label: "SETUP PHOTO \u2014 truck at event",
    style: {
      gridRow: 'span 2',
      aspectRatio: 'auto'
    }
  }), /*#__PURE__*/React.createElement(PlaceholderBox, {
    label: "plated pies",
    aspect: "1"
  }), /*#__PURE__*/React.createElement(PlaceholderBox, {
    label: "the crew",
    aspect: "1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      color: 'var(--red)',
      fontSize: '.95rem',
      display: 'block',
      marginBottom: 4
    }
  }, "we bring the terrible"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(2rem,4vw,3rem)',
      margin: 0
    }
  }, "Catering & Events"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      maxWidth: '42ch'
    }
  }, "We roll the wood-fired trailer (and soon, the truck) to your thing and feed your people fresh, blistered pies on-site. Tell us the date, the headcount, and how weird you want it."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '20px 0 26px',
      padding: 0
    }
  }, ['Weddings & rehearsal dinners', 'Corporate events & office drops', 'Festivals & markets', 'Private parties & backyard chaos'].map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '9px 0',
      fontWeight: 700,
      fontSize: '1.05rem',
      borderBottom: '1px dashed var(--paper-line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--red)',
      fontFamily: 'var(--font-display)',
      fontSize: '1.2rem'
    }
  }, "\u2726"), " ", t))), /*#__PURE__*/React.createElement(Button, {
    variant: "red",
    href: "#contact"
  }, "Request a Quote \u2192"))));
}
window.CateringSection = CateringSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/CateringSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Footer.jsx
try { (() => {
const LINK_COLS = [{
  h: 'The Goods',
  links: ['Our Pizzas', "This Week's Stops", 'Catering & Events', 'Recommended Venues']
}, {
  h: 'The Lore',
  links: ['The Story of Gerald', 'Testimonials of Terrible', 'The Wall of Gerald', 'Get in Touch']
}];
function Footer({
  logoSrc,
  igSvg,
  tiktokSvg
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink)',
      color: 'var(--cream)',
      padding: '54px 0 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      gap: 34,
      marginBottom: 36
    },
    className: "gerald-foot-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: .82
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: '1rem',
      letterSpacing: '.06em'
    }
  }, "TERRIBLE"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: '1.8rem',
      color: 'var(--red)'
    }
  }, "GERALD'S"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: '.72rem',
      letterSpacing: '.32em',
      opacity: .7
    }
  }, "PIZZA \xB7 OMAHA, NE")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      opacity: .8,
      maxWidth: '34ch',
      fontSize: '.9rem'
    }
  }, "Unorthodox Neapolitan pizza on wheels. Questionable decisions, excellent pizza."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 10
    }
  }, [igSvg, tiktokSvg].filter(Boolean).map((svg, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      width: 36,
      height: 36,
      border: '2px solid var(--cream)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--cream)'
    },
    dangerouslySetInnerHTML: {
      __html: svg
    }
  })))), LINK_COLS.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      letterSpacing: '.05em',
      marginBottom: 14,
      fontSize: '1rem',
      textTransform: 'uppercase'
    }
  }, c.h), c.links.map((l, j) => /*#__PURE__*/React.createElement("a", {
    key: j,
    href: "#",
    style: {
      display: 'block',
      padding: '5px 0',
      fontSize: '.9rem',
      opacity: .85,
      color: 'var(--cream)',
      textDecoration: 'none'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(251,245,232,.18)',
      paddingTop: 20,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 14,
      flexWrap: 'wrap',
      fontSize: '.78rem',
      opacity: .65
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Terrible Gerald's Pizza \xB7 Omaha, NE"), /*#__PURE__*/React.createElement("span", null, "Season 3 \xB7 Vol. 6 \u2014 site comp"))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Hero.jsx
try { (() => {
const {
  PlaceholderBox
} = window.TerribleGeraldSDesignSystem_d3d4e8;
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--ink)',
      overflow: 'hidden',
      color: 'var(--cream)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement(PlaceholderBox, {
    dark: true,
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 0,
      border: 'none'
    }
  }, "\u25B6 HERO REEL GOES HERE", /*#__PURE__*/React.createElement("br", null), "(autoplay \xB7 muted \xB7 looped)", /*#__PURE__*/React.createElement("br", null), "truck \u2022 flames \u2022 dough pulls"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg,rgba(15,11,7,.92) 0%,rgba(15,11,7,.6) 50%,rgba(15,11,7,.25) 100%)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      maxWidth: 1180,
      margin: '0 auto',
      padding: '90px 24px 110px',
      display: 'grid',
      gridTemplateColumns: '1.1fr .9fr',
      gap: 30,
      alignItems: 'center'
    },
    className: "gerald-hero-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      color: 'var(--gold)',
      letterSpacing: '.04em',
      fontSize: '1rem',
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: 2,
      width: 46,
      background: 'var(--gold)'
    }
  }), " Unorthodox Neapolitan \xB7 Omaha, NE"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      textTransform: 'uppercase',
      lineHeight: .98,
      letterSpacing: 'var(--display-tracking)',
      fontSize: 'var(--text-h1)',
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "Questionable"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      color: 'transparent',
      WebkitTextStroke: '2px var(--cream)'
    }
  }, "Decisions."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      color: 'var(--red)'
    }
  }, "Excellent"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "Pizza.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: '1.15rem',
      maxWidth: '30ch',
      margin: '22px 0 30px',
      color: '#ecdfc7'
    }
  }, "Wood-fired pies with terrible names and an incredible reputation. We park at breweries. You get weird."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#schedule",
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      fontSize: '1rem',
      padding: '15px 26px',
      borderRadius: 3,
      background: 'var(--red)',
      color: 'var(--cream)',
      boxShadow: 'var(--offset-shadow) var(--red-deep)',
      textDecoration: 'none',
      display: 'inline-flex',
      gap: 9
    }
  }, "Find Us This Week \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "#catering",
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      fontSize: '1rem',
      padding: '15px 26px',
      borderRadius: 3,
      background: 'transparent',
      color: 'var(--cream)',
      border: '2.5px solid var(--cream)',
      textDecoration: 'none',
      display: 'inline-flex',
      gap: 9
    }
  }, "Book Catering"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      justifySelf: 'center'
    },
    className: "gerald-hero-gerald"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -6,
      right: -18,
      background: 'var(--cream)',
      color: 'var(--ink)',
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontSize: '.8rem',
      padding: '12px 16px',
      borderRadius: 14,
      transform: 'rotate(4deg)',
      maxWidth: 170,
      boxShadow: 'var(--shadow-soft)',
      zIndex: 4
    }
  }, "wood fired \xB7 get weird \xB7 eat pizza"), /*#__PURE__*/React.createElement(PlaceholderBox, {
    style: {
      width: 'min(330px,38vw)',
      aspectRatio: '3/4',
      background: 'rgba(251,245,232,.06)',
      borderColor: 'rgba(232,161,30,.45)',
      color: '#e8c98a'
    }
  }, "GERALD", /*#__PURE__*/React.createElement("br", null), "(post tummy-tuck)", /*#__PURE__*/React.createElement("br", null), "\u2014 your mascot art slots here \u2014"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 30,
      left: -12,
      background: 'var(--gold)',
      color: 'var(--ink)',
      fontFamily: 'var(--font-display)',
      padding: '6px 14px',
      transform: 'rotate(-5deg)',
      fontSize: '.8rem',
      letterSpacing: '.06em'
    }
  }, "\u2605 DOORBUSTER"))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/NewsletterSection.jsx
try { (() => {
const {
  NewsletterForm,
  Stamp
} = window.TerribleGeraldSDesignSystem_d3d4e8;
function NewsletterSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '74px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--red)',
      color: 'var(--cream)',
      borderRadius: 12,
      padding: 46,
      display: 'grid',
      gridTemplateColumns: '1.1fr .9fr',
      gap: 34,
      alignItems: 'center',
      boxShadow: 'var(--shadow-soft)',
      position: 'relative',
      overflow: 'hidden'
    },
    className: "gerald-news"
  }, /*#__PURE__*/React.createElement(Stamp, {
    style: {
      position: 'absolute',
      top: 18,
      right: 22,
      color: 'var(--cream)',
      borderColor: 'var(--cream)'
    }
  }, "\uD83D\uDCEC do it"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(1.8rem,3.8vw,2.8rem)',
      margin: 0
    }
  }, "Get the Chaos Delivered"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      maxWidth: '36ch',
      opacity: .92
    }
  }, "Join the mailing list for stops, specials, and general nonsense. We promise to be terrible about it.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NewsletterForm, null), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '.78rem',
      opacity: .8,
      marginTop: 10
    }
  }, "\u2026or just ", /*#__PURE__*/React.createElement("a", {
    href: "#catering",
    style: {
      color: 'var(--cream)',
      textDecoration: 'underline'
    }
  }, "book catering"), " and skip the small talk.")))));
}
window.NewsletterSection = NewsletterSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/NewsletterSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/PizzaSection.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  PizzaCard,
  SectionHeader
} = window.TerribleGeraldSDesignSystem_d3d4e8;
const PIZZAS = [{
  name: 'The Gerald',
  ingredients: 'Red sauce, mozz, pepperoni, hot honey, parm, basil'
}, {
  name: 'The Hoppen',
  ingredients: 'Garlic oil, mozz, sausage, hot honey, ricotta, arugula'
}, {
  name: 'The Meat Sweats',
  ingredients: 'Red sauce, mozz, pepperoni, sausage, bacon, hot honey'
}, {
  name: 'The Veg Out',
  ingredients: 'Garlic oil, mozz, mushroom, red onion, spinach, ricotta'
}];
function PizzaSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '74px 0',
      background: 'var(--cream)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    kicker: "terrible names. you'll order anyway.",
    title: "Our Pizzas"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 18
    },
    className: "gerald-pizza-grid"
  }, PIZZAS.map((p, i) => /*#__PURE__*/React.createElement(PizzaCard, _extends({
    key: i
  }, p)))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      marginTop: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed var(--red)',
      color: 'var(--red)',
      fontFamily: 'var(--font-display)',
      textAlign: 'center',
      borderRadius: 8,
      minHeight: 70,
      textDecoration: 'none'
    }
  }, "MORE PIES PLZ! \u2192 SEE THE FULL MENU")));
}
window.PizzaSection = PizzaSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/PizzaSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ReviewsSection.jsx
try { (() => {
const {
  QuoteCard
} = window.TerribleGeraldSDesignSystem_d3d4e8;
function ReviewsSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '74px 0',
      background: 'var(--ink)',
      color: 'var(--cream)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: '.9fr 1.1fr',
      gap: 36,
      alignItems: 'center'
    },
    className: "gerald-reviews"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '5.5rem',
      color: 'var(--gold)',
      lineHeight: .85
    }
  }, "4.9"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--gold)',
      fontSize: '1.5rem',
      letterSpacing: '.1em'
    }
  }, "\u2605\u2605\u2605\u2605\u2605"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      fontSize: '.8rem',
      marginTop: 8,
      color: 'var(--gold)'
    }
  }, "Best Pizza in Omaha?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      fontSize: '.8rem',
      marginTop: 8,
      opacity: .7
    }
  }, "Based on 500+ Google reviews")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 14
    },
    className: "gerald-quotes"
  }, /*#__PURE__*/React.createElement(QuoteCard, {
    tone: "cream",
    quote: '"I drove 45 minutes for this pizza."',
    source: "a reasonable person"
  }), /*#__PURE__*/React.createElement(QuoteCard, {
    tone: "ink",
    quote: '"Terrible name. Incredible pizza."',
    source: "everybody, eventually"
  }), /*#__PURE__*/React.createElement(QuoteCard, {
    tone: "red",
    quote: '"The best food truck experience in Omaha."',
    source: "\u2605\u2605\u2605\u2605\u2605"
  }), /*#__PURE__*/React.createElement(QuoteCard, {
    tone: "teal",
    quote: "\"Thanks. You're terrible.\"",
    source: "Gerald, probably"
  }))));
}
window.ReviewsSection = ReviewsSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ReviewsSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ScheduleSection.jsx
try { (() => {
const {
  PlaceholderBox,
  SectionHeader,
  Button,
  Stamp,
  ScheduleCard
} = window.TerribleGeraldSDesignSystem_d3d4e8;
const SCHEDULE = [{
  day: 'FRI',
  date: '5/30',
  venue: 'Site-1 Brewing',
  address: '2566 Farnam St',
  time: '5–9PM',
  now: true
}, {
  day: 'SAT',
  date: '5/31',
  venue: 'Nebraska Brewing Co.',
  address: 'La Vista',
  time: '12–8PM'
}, {
  day: 'SUN',
  date: '6/1',
  venue: 'The Upstream Brewing',
  address: 'Old Market',
  time: '1–6PM'
}, {
  day: 'WED',
  date: '6/4',
  venue: 'Beercade',
  address: 'Aksarben',
  time: '5–9PM'
}, {
  day: 'FRI',
  date: '6/6',
  venue: 'Infusion Brewing',
  address: 'Benson',
  time: '5–9PM'
}];
function ScheduleSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '74px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    kicker: "where's the truck?",
    title: "This Week's Stops",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ink",
      size: "sm"
    }, "Full Schedule")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.05fr .95fr',
      gap: 36
    },
    className: "gerald-sched-grid"
  }, /*#__PURE__*/React.createElement(ScheduleCard, {
    heading: "\uD83D\uDCCD May 30 \u2013 June 6",
    rows: SCHEDULE
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.3rem'
    }
  }, "@terriblegeralds", /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      color: 'var(--ink-soft)',
      fontSize: '.78rem',
      textTransform: 'none'
    }
  }, "the schedule lives on Instagram \u2014 pulled in live")), /*#__PURE__*/React.createElement(Stamp, null, "follow")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 10
    }
  }, Array.from({
    length: 6
  }).map((_, i) => /*#__PURE__*/React.createElement(PlaceholderBox, {
    key: i,
    label: "IG post",
    aspect: "1"
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '.82rem',
      color: 'var(--ink-soft)',
      margin: 0
    }
  }, "Auto-syncs your latest Instagram posts so the weekly drop updates itself.")))));
}
window.ScheduleSection = ScheduleSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ScheduleSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/TestimonialsSection.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  FeatureCard,
  PlaceholderBox
} = window.TerribleGeraldSDesignSystem_d3d4e8;
const FEATURES = [{
  by: 'Hoppen Interview',
  what: 'Sit-down with the homies',
  cta: '▶ Listen Now',
  thumbLabel: '🎙 photo'
}, {
  by: 'Meat Locker Pod',
  what: 'Podcast appearance',
  cta: '▶ Listen Now',
  thumbLabel: '🎙 podcast'
}, {
  by: 'KELOLAND',
  what: 'TV feature',
  cta: '▶ Watch',
  thumbLabel: '📺 clip'
}, {
  by: 'Omaha World-Herald',
  what: '"Food truck serving up unique pies in Omaha"',
  cta: '▶ Read',
  thumbLabel: '📰 clipping'
}];
const TIKTOKS = [{
  handle: '@emiliestrumlcin',
  views: '116K'
}, {
  handle: '@hr.doods',
  views: '67K'
}, {
  handle: '@piecewayforfood',
  views: '82K'
}, {
  handle: '@hangryhoppers',
  views: '71K'
}, {
  handle: '@tiktoktodelats',
  views: '91K'
}, {
  handle: '@cheeseloveshim',
  views: '560K'
}];
function TestimonialsSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '74px 0',
      background: 'var(--ink)',
      color: 'var(--cream)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      color: 'var(--gold)',
      fontSize: '.95rem',
      display: 'block',
      marginBottom: 4
    }
  }, "people keep talking about us"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(2rem,4.4vw,3.3rem)',
      margin: 0
    }
  }, "Testimonials of Terrible")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16,
      marginBottom: 46
    },
    className: "gerald-feat-grid"
  }, FEATURES.map((f, i) => /*#__PURE__*/React.createElement(FeatureCard, _extends({
    key: i
  }, f)))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      marginBottom: 6,
      textTransform: 'uppercase'
    }
  }, "Featured by these (slightly unhinged) people"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#caa45d',
      marginBottom: 22,
      maxWidth: '60ch'
    }
  }, "Omaha's TikTok creators are weirdly into us \u2014 and we're not mad about it. Their favorable clips, embedded straight from TikTok."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6,1fr)',
      gap: 12
    },
    className: "gerald-tok-grid"
  }, TIKTOKS.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'relative',
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(PlaceholderBox, {
    dark: true,
    label: "TikTok",
    aspect: "9/16"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/play.svg",
    alt: "play",
    style: {
      width: 34,
      height: 34,
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.5))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 6,
      bottom: 6,
      right: 6,
      fontSize: '.68rem',
      fontWeight: 700,
      color: '#fff',
      textShadow: '0 1px 3px #000',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, t.handle), /*#__PURE__*/React.createElement("span", null, t.views)))))));
}
window.TestimonialsSection = TestimonialsSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/TestimonialsSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/VenuesSection.jsx
try { (() => {
const venueIcons = {
  brewery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h11v9a3 3 0 01-3 3H8a3 3 0 01-3-3V8z"/><path d="M16 10h2.5a2.5 2.5 0 010 5H16"/><path d="M8 5v3M11 4v4M14 5v3"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>`,
  park: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2L8 12h8L12 2zM12 12v9M7 12l-3 9M17 12l3 9"/></svg>`,
  event: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>`
};
const VENUES = [{
  t: 'Breweries',
  d: 'Our natural habitat',
  ic: 'brewery'
}, {
  t: 'Venues',
  d: 'Spaces for the chaos',
  ic: 'building'
}, {
  t: 'Parks',
  d: 'Eat outside, weirdo',
  ic: 'park'
}, {
  t: 'Event Spots',
  d: 'Book us together',
  ic: 'event'
}];
function VenuesSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '74px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 20,
      marginBottom: 34,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      color: 'var(--red)',
      fontSize: '.95rem',
      display: 'block',
      marginBottom: 4
    }
  }, "where to find good people & good beer"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(2rem,4.4vw,3.3rem)',
      margin: 0
    }
  }, "Gerald's Favorite Places"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    },
    className: "gerald-ven-grid"
  }, VENUES.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--bone-2)',
      border: '2px solid var(--ink)',
      borderRadius: 8,
      padding: '24px 18px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      margin: '0 auto 12px',
      color: 'var(--ink)'
    },
    dangerouslySetInnerHTML: {
      __html: venueIcons[v.ic]
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.15rem'
    }
  }, v.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '.78rem',
      color: 'var(--ink-soft)',
      marginTop: 4
    }
  }, v.d))))));
}
window.VenuesSection = VenuesSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/VenuesSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/WallSection.jsx
try { (() => {
const {
  PlaceholderBox
} = window.TerribleGeraldSDesignSystem_d3d4e8;
const MOODS = ['😐', '😑', '🍕', '😋', '😵', '★', '😬', '🤨', '😎', '😶', '🍕', '😴', '😏', '😮', '★', '😐'];
function WallSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '74px 0',
      background: 'var(--ink)',
      color: 'var(--cream)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 20,
      marginBottom: 34,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      color: 'var(--gold)',
      fontSize: '.95rem',
      display: 'block',
      marginBottom: 4
    }
  }, "the people demanded it"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(2rem,4.4vw,3.3rem)',
      margin: 0
    }
  }, "The Wall of Gerald"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(8,1fr)',
      gap: 10
    },
    className: "gerald-wall"
  }, MOODS.map((m, i) => /*#__PURE__*/React.createElement(PlaceholderBox, {
    key: i,
    dark: true,
    label: m,
    aspect: "1",
    style: {
      fontSize: '.6rem'
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      marginTop: 18,
      color: '#caa45d',
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic'
    }
  }, "a home for your boatloads of unused Geralds.")));
}
window.WallSection = WallSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/WallSection.jsx", error: String((e && e.message) || e) }); }

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.PizzaCard = __ds_scope.PizzaCard;

__ds_ns.QuoteCard = __ds_scope.QuoteCard;

__ds_ns.ScheduleCard = __ds_scope.ScheduleCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.PlaceholderBox = __ds_scope.PlaceholderBox;

__ds_ns.Stamp = __ds_scope.Stamp;

__ds_ns.NewsletterForm = __ds_scope.NewsletterForm;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.TapeStrip = __ds_scope.TapeStrip;

__ds_ns.TornDivider = __ds_scope.TornDivider;

__ds_ns.Marquee = __ds_scope.Marquee;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.NextAppearanceBar = __ds_scope.NextAppearanceBar;

})();
