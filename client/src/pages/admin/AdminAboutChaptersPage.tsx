import { FormEvent, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { adminAboutChapters } from '../../services/adminApi';
import { getAdminRequestError } from '../../hooks/useAdminApiReady';
import { useAdminLoad } from '../../hooks/useAdminLoad';
import type { AboutChapter } from '../../types';

const emptyChapter = {
  year: '',
  title: '',
  description: '',
  showOnHome: false,
  sortOrder: 0,
  active: true,
};

export default function AdminAboutChaptersPage() {
  const { user } = useAuth0();
  const [chapters, setChapters] = useState<AboutChapter[]>([]);
  const [form, setForm] = useState(emptyChapter);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = () =>
    adminAboutChapters
      .list()
      .then(setChapters)
      .catch((err) => setError(getAdminRequestError(err, user?.email)));

  useAdminLoad(load);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      if (editingId) {
        await adminAboutChapters.update(editingId, form);
      } else {
        await adminAboutChapters.create(form);
      }
      setForm(emptyChapter);
      setEditingId(null);
      await load();
    } catch {
      setError('Could not save about chapter.');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">About Chapters</h2>
      <p className="mb-4 text-sm text-slate-600">
        Powers the brand-history timeline on the About page and the home page teaser. Check
        &quot;Show on home&quot; for chapters that appear in the condensed home timeline.
      </p>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded border p-4 md:grid-cols-2">
        <input
          className="rounded border px-3 py-2"
          placeholder="Year (e.g. 2018 or NOW)"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Title (e.g. Bad Ideas)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="rounded border px-3 py-2 md:col-span-2"
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
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
            checked={form.showOnHome}
            onChange={(e) => setForm({ ...form, showOnHome: e.target.checked })}
          />
          Show on home timeline
        </label>
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Active on public site
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="rounded bg-red-700 px-4 py-2 text-white">
            {editingId ? 'Update' : 'Add'} chapter
          </button>
          {editingId && (
            <button
              type="button"
              className="rounded border px-4 py-2"
              onClick={() => {
                setForm(emptyChapter);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <ul className="divide-y rounded border">
        {chapters.map((chapter) => (
          <li key={chapter._id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">
                {chapter.year} — {chapter.title}
              </p>
              <p className="text-sm text-slate-600">
                {chapter.description.slice(0, 120)}
                {chapter.description.length > 120 ? '…' : ''}
                {chapter.showOnHome && ' · home timeline'}
                {!chapter.active && ' · inactive'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border px-3 py-1 text-sm"
                onClick={() => {
                  setEditingId(chapter._id);
                  setForm({
                    year: chapter.year,
                    title: chapter.title,
                    description: chapter.description,
                    showOnHome: chapter.showOnHome,
                    sortOrder: chapter.sortOrder,
                    active: chapter.active,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded border border-red-200 px-3 py-1 text-sm text-red-700"
                onClick={async () => {
                  if (!window.confirm(`Delete "${chapter.title}"?`)) return;
                  await adminAboutChapters.remove(chapter._id);
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
