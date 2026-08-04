import { Link } from 'react-router-dom';

const cards = [
  {
    to: '/admin/themes',
    title: 'Theme',
    blurb: 'Colors, fonts, and accents for the public site — manual preset rotation.',
  },
  { to: '/admin/events', title: 'Events', blurb: 'Schedule pop-ups, venues, and ticket links.' },
  { to: '/admin/menu', title: 'Menu', blurb: 'Manage pizza names, descriptions, and images.' },
  {
    to: '/admin/catering-tiers',
    title: 'Catering Tiers',
    blurb: 'Edit catering package names, prices, and includes.',
  },
  {
    to: '/admin/venues',
    title: 'Venues',
    blurb: 'Edit home page venue category cards and icons.',
  },
  {
    to: '/admin/press-features',
    title: 'Press & TikTok',
    blurb: 'Edit home page press cards and TikTok feature tiles.',
  },
  {
    to: '/admin/about-chapters',
    title: 'About Chapters',
    blurb: 'Edit brand-history timeline on About and home teaser.',
  },
  {
    to: '/admin/wall-items',
    title: 'Wall Items',
    blurb: 'Edit The Wall of Gerald grid on the home page.',
  },
  { to: '/admin/faqs', title: 'FAQs', blurb: 'Edit homepage frequently asked questions.' },
  { to: '/admin/content', title: 'Site Content', blurb: 'Update hero copy, about text, and notices.' },
  {
    to: '/admin/inquiries',
    title: 'Inquiries',
    blurb: 'Review general contact and private event form submissions.',
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <p className="admin-kicker mb-1">content admin</p>
      <h2 className="admin-heading mb-2 text-2xl">Dashboard</h2>
      <p className="mb-6 text-sm" style={{ color: 'var(--ink-soft)' }}>
        Manage Terrible Gerald&apos;s public website content. Most changes appear on the live
        site immediately after saving. Theme changes apply when you activate a preset.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="admin-card-link">
            <h3 className="admin-heading text-lg">{card.title}</h3>
            <p className="mt-1 text-sm" style={{ color: 'var(--ink-soft)' }}>
              {card.blurb}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
