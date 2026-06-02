import { FormEvent, useEffect, useState } from 'react';
import { adminEvents } from '../../services/adminApi';
import type { Event } from '../../types';

const emptyEvent = {
  title: '',
  slug: '',
  description: '',
  venue: '',
  address: '',
  startDate: '',
  endDate: '',
  mapUrl: '',
  ticketUrl: '',
  featured: false,
  published: true,
  sortOrder: 0,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState(emptyEvent);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = () => adminEvents.list().then(setEvents).catch(() => setError('Failed to load events'));

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyEvent);
    setEditingId(null);
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
    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description,
      venue: item.venue,
      address: item.address || '',
      startDate: item.startDate.slice(0, 16),
      endDate: item.endDate ? item.endDate.slice(0, 16) : '',
      mapUrl: item.mapUrl || '',
      ticketUrl: item.ticketUrl || '',
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
      <h2 className="mb-4 text-2xl font-semibold">Events</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded border p-4 md:grid-cols-2">
        <input
          className="rounded border px-3 py-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Slug (optional)"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <input
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
          required
        />
        <textarea
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="datetime-local"
          className="rounded border px-3 py-2"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          className="rounded border px-3 py-2"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Map URL"
          value={form.mapUrl}
          onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Ticket URL"
          value={form.ticketUrl}
          onChange={(e) => setForm({ ...form, ticketUrl: e.target.value })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>
        <div className="flex gap-2">
          <button type="submit" className="rounded bg-red-700 px-4 py-2 text-white">
            {editingId ? 'Update' : 'Create'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded border px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {events.map((event) => (
          <div key={event._id} className="flex items-start justify-between rounded border p-4">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-slate-600">
                {new Date(event.startDate).toLocaleString()} — {event.venue}
              </p>
              {!event.published && <span className="text-xs text-amber-700">Draft</span>}
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
