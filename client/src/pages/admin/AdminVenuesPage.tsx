import { FormEvent, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { adminVenues } from '../../services/adminApi';
import { getAdminRequestError } from '../../hooks/useAdminApiReady';
import { useAdminLoad } from '../../hooks/useAdminLoad';
import type { Venue, VenueCategoryIcon } from '../../types';

const ICON_OPTIONS: { value: VenueCategoryIcon; label: string }[] = [
  { value: 'brewery', label: 'Brewery' },
  { value: 'building', label: 'Building / Venue' },
  { value: 'park', label: 'Park' },
  { value: 'event', label: 'Event' },
];

const emptyVenue = {
  name: '',
  categoryIcon: 'brewery' as VenueCategoryIcon,
  blurb: '',
  sortOrder: 0,
  active: true,
};

export default function AdminVenuesPage() {
  const { user } = useAuth0();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [form, setForm] = useState(emptyVenue);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = () =>
    adminVenues
      .list()
      .then(setVenues)
      .catch((err) => setError(getAdminRequestError(err, user?.email)));

  useAdminLoad(load);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      if (editingId) {
        await adminVenues.update(editingId, form);
      } else {
        await adminVenues.create(form);
      }
      setForm(emptyVenue);
      setEditingId(null);
      await load();
    } catch {
      setError('Could not save venue.');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Venue Categories</h2>
      <p className="mb-4 text-sm text-slate-600">
        Powers the &quot;Gerald&apos;s Favorite Places&quot; grid on the home page.
      </p>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded border p-4 md:grid-cols-2">
        <input
          className="rounded border px-3 py-2"
          placeholder="Name (e.g. Breweries)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <select
          className="rounded border px-3 py-2"
          value={form.categoryIcon}
          onChange={(e) =>
            setForm({ ...form, categoryIcon: e.target.value as VenueCategoryIcon })
          }
        >
          {ICON_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Blurb (e.g. Our natural habitat)"
          value={form.blurb}
          onChange={(e) => setForm({ ...form, blurb: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Sort order"
          value={form.sortOrder}
          onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Active on public site
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="rounded bg-red-700 px-4 py-2 text-white">
            {editingId ? 'Update' : 'Add'} venue
          </button>
          {editingId && (
            <button
              type="button"
              className="rounded border px-4 py-2"
              onClick={() => {
                setForm(emptyVenue);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <ul className="divide-y rounded border">
        {venues.map((venue) => (
          <li key={venue._id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{venue.name}</p>
              <p className="text-sm text-slate-600">
                {venue.categoryIcon} · {venue.blurb}
                {!venue.active && ' · inactive'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border px-3 py-1 text-sm"
                onClick={() => {
                  setEditingId(venue._id);
                  setForm({
                    name: venue.name,
                    categoryIcon: venue.categoryIcon,
                    blurb: venue.blurb,
                    sortOrder: venue.sortOrder,
                    active: venue.active,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded border border-red-200 px-3 py-1 text-sm text-red-700"
                onClick={async () => {
                  if (!window.confirm(`Delete "${venue.name}"?`)) return;
                  await adminVenues.remove(venue._id);
                  await load();
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
