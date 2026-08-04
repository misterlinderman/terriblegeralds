import { FormEvent, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { adminWallItems } from '../../services/adminApi';
import { getAdminRequestError } from '../../hooks/useAdminApiReady';
import { useAdminLoad } from '../../hooks/useAdminLoad';
import type { WallItem } from '../../types';

const emptyItem = {
  caption: '',
  imageUrl: '',
  linkUrl: '',
  sortOrder: 0,
  active: true,
};

export default function AdminWallItemsPage() {
  const { user } = useAuth0();
  const [items, setItems] = useState<WallItem[]>([]);
  const [form, setForm] = useState(emptyItem);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = () =>
    adminWallItems
      .list()
      .then(setItems)
      .catch((err) => setError(getAdminRequestError(err, user?.email)));

  useAdminLoad(load);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    const payload = {
      ...form,
      imageUrl: form.imageUrl.trim() || undefined,
      linkUrl: form.linkUrl.trim() || undefined,
    };

    try {
      if (editingId) {
        await adminWallItems.update(editingId, payload);
      } else {
        await adminWallItems.create(payload);
      }
      setForm(emptyItem);
      setEditingId(null);
      await load();
    } catch {
      setError('Could not save wall item.');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Wall Items</h2>
      <p className="mb-4 text-sm text-slate-600">
        Powers &quot;The Wall of Gerald&quot; grid on the home page. Leave image URL empty to
        show a placeholder tile with the caption (emoji or short label). Images use static
        paths under <code className="rounded bg-slate-100 px-1">client/public/</code>.
      </p>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded border p-4 md:grid-cols-2">
        <input
          className="rounded border px-3 py-2"
          placeholder="Caption (e.g. 😐 or fan photo)"
          value={form.caption}
          onChange={(e) => setForm({ ...form, caption: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Image URL (optional, e.g. /images/wall/gerald-1.webp)"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <input
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Link URL (optional)"
          value={form.linkUrl}
          onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
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
            {editingId ? 'Update' : 'Add'} wall item
          </button>
          {editingId && (
            <button
              type="button"
              className="rounded border px-4 py-2"
              onClick={() => {
                setForm(emptyItem);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <ul className="divide-y rounded border">
        {items.map((item) => (
          <li key={item._id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{item.caption}</p>
              <p className="text-sm text-slate-600">
                {item.imageUrl || 'placeholder tile'}
                {item.linkUrl && ' · linked'}
                {!item.active && ' · inactive'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border px-3 py-1 text-sm"
                onClick={() => {
                  setEditingId(item._id);
                  setForm({
                    caption: item.caption,
                    imageUrl: item.imageUrl || '',
                    linkUrl: item.linkUrl || '',
                    sortOrder: item.sortOrder,
                    active: item.active,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded border border-red-200 px-3 py-1 text-sm text-red-700"
                onClick={async () => {
                  if (!window.confirm(`Delete "${item.caption}"?`)) return;
                  await adminWallItems.remove(item._id);
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
