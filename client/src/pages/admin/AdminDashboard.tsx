import { Link } from 'react-router-dom';

const cards = [
  { to: '/admin/events', title: 'Events', blurb: 'Schedule pop-ups, venues, and ticket links.' },
  { to: '/admin/menu', title: 'Menu', blurb: 'Manage pizza names, descriptions, and images.' },
  { to: '/admin/faqs', title: 'FAQs', blurb: 'Edit homepage frequently asked questions.' },
  { to: '/admin/content', title: 'Site Content', blurb: 'Update hero copy, about text, and notices.' },
  { to: '/admin/inquiries', title: 'Inquiries', blurb: 'Review private event contact form submissions.' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold text-slate-900">Dashboard</h2>
      <p className="mb-6 text-slate-600">
        Manage Terrible Gerald&apos;s public website content. Changes appear on the live site
        immediately after saving.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded-lg border border-slate-200 p-4 transition hover:border-red-700 hover:shadow-sm"
          >
            <h3 className="text-lg font-medium text-slate-900">{card.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{card.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
