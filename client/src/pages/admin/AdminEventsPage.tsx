import { FormEvent, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { adminEvents } from '../../services/adminApi';
import { getAdminRequestError } from '../../hooks/useAdminApiReady';
import type { Event } from '../../types';

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const emptyEvent = {
  title: '',
  slug: '',
  description: '',
  venue: '',
  address: '',
  startDate: '',
  endDate: '',
  mapUrl: '',
  featured: false,
  published: true,
  sortOrder: 0,
};

export default function AdminEventsPage() {
  const { user } = useAuth0();
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState(emptyEvent);
  const [slugTouched, setSlugTouched] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = () =>
    adminEvents
      .list()
      .then(setEvents)
      .catch((err) => setError(getAdminRequestError(err, user?.email)));

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyEvent);
    setSlugTouched(false);
    setEditingId(null);
  };

  const updateTitle = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: !slugTouched && !editingId ? slugify(title) : prev.slug,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      if (editingId) {
        await adminEvents.update(editingId, form);
      } else {
        await adminEvents.create(form);
      }
      resetForm();
      await load();
    } catch {
      setError('Could not save event.');
    }
  };

  const handleEdit = (item: Event) => {
    setEditingId(item._id);
    setSlugTouched(true);
    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description,
      venue: item.venue,
      address: item.address || '',
      startDate: item.startDate.slice(0, 16),
      endDate: item.endDate ? item.endDate.slice(0, 16) : '',
      mapUrl: item.mapUrl || '',
      featured: item.featured,
      published: item.published,
      sortOrder: item.sortOrder,
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this event?')) return;
    await adminEvents.remove(id);
    await load();
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Events</h2>
      <p className="mb-4 text-sm text-slate-600">
        Upcoming published events appear on the homepage hero and the public events page.
      </p>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded border p-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Title</span>
          <input
            className="rounded border px-3 py-2"
            placeholder="Barry O's Tavern"
            value={form.title}
            onChange={(e) => updateTitle(e.target.value)}
            required
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Slug</span>
          <input
            className="rounded border px-3 py-2"
            placeholder="barry-os-tavern-june-2026"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm({ ...form, slug: e.target.value });
            }}
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Venue</span>
          <input
            className="rounded border px-3 py-2"
            placeholder="Barry O's Tavern"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            required
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Address</span>
          <input
            className="rounded border px-3 py-2"
            placeholder="420 S 16th St, Omaha, NE 68102"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </label>
        <label className="grid gap-1 text-sm md:col-span-2">
          <span className="font-medium">Description (optional)</span>
          <textarea
            className="rounded border px-3 py-2"
            placeholder="Extra details shown on the events page"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Start date & time</span>
          <input
            type="datetime-local"
            className="rounded border px-3 py-2"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">End date & time</span>
          <input
            type="datetime-local"
            className="rounded border px-3 py-2"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
        </label>
        <label className="grid gap-1 text-sm md:col-span-2">
          <span className="font-medium">Map URL</span>
          <input
            className="rounded border px-3 py-2"
            placeholder="Google Maps link to the truck location"
            value={form.mapUrl}
            onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="rounded bg-red-700 px-4 py-2 text-white">
            {editingId ? 'Update event' : 'Create event'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded border px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {events.length === 0 && (
          <p className="rounded border border-dashed p-4 text-sm text-slate-600">
            No events yet. Create one above, or run <code className="rounded bg-slate-100 px-1">npm run seed:events</code>{' '}
            for a sample Barry O&apos;s Tavern event.
          </p>
        )}
        {events.map((event) => (
          <div key={event._id} className="flex items-start justify-between rounded border p-4">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-slate-600">
                {new Date(event.startDate).toLocaleString()}
                {event.endDate ? ` – ${new Date(event.endDate).toLocaleString()}` : ''}
              </p>
              <p className="text-sm text-slate-600">{event.venue}</p>
              {event.address && <p className="text-sm text-slate-500">{event.address}</p>}
              <div className="mt-1 flex gap-2 text-xs">
                {!event.published && <span className="text-amber-700">Draft</span>}
                {event.featured && <span className="text-blue-700">Featured</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="text-sm text-blue-700" onClick={() => handleEdit(event)}>
                Edit
              </button>
              <button type="button" className="text-sm text-red-700" onClick={() => handleDelete(event._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
