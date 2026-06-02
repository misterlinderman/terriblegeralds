import { FormEvent, useEffect, useState } from 'react';
import { adminMenu } from '../../services/adminApi';
import type { MenuItem } from '../../types';

const emptyItem = {
  name: '',
  slug: '',
  description: '',
  imagePath: '',
  sortOrder: 0,
  active: true,
};

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState(emptyItem);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = () => adminMenu.list().then((data) => setItems(data));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (editingId) {
      await adminMenu.update(editingId, form);
    } else {
      await adminMenu.create(form);
    }
    setForm(emptyItem);
    setEditingId(null);
    await load();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Menu Items</h2>
      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded border p-4 md:grid-cols-2">
        <input
          className="rounded border px-3 py-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Image path (e.g. /images/pizzas/pepperoni.webp)"
          value={form.imagePath}
          onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
          required
        />
        <textarea
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="number"
          className="rounded border px-3 py-2"
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
          Active
        </label>
        <button type="submit" className="rounded bg-red-700 px-4 py-2 text-white md:col-span-2">
          {editingId ? 'Update item' : 'Add item'}
        </button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between rounded border p-4">
            <div className="flex items-center gap-4">
              <img src={item.imagePath} alt={item.name} className="h-16 w-16 rounded object-cover" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-sm text-blue-700"
                onClick={() => {
                  setEditingId(item._id);
                  setForm({
                    name: item.name,
                    slug: item.slug,
                    description: item.description,
                    imagePath: item.imagePath,
                    sortOrder: item.sortOrder,
                    active: item.active,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-sm text-red-700"
                onClick={async () => {
                  if (window.confirm('Delete menu item?')) {
                    await adminMenu.remove(item._id);
                    await load();
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
