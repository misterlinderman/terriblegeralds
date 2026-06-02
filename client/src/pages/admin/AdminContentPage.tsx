import { FormEvent, useEffect, useState } from 'react';
import { adminContent } from '../../services/adminApi';
import type { SiteContentEntry } from '../../types';

const emptyEntry = { key: '', section: '', label: '', value: '' };

export default function AdminContentPage() {
  const [entries, setEntries] = useState<SiteContentEntry[]>([]);
  const [form, setForm] = useState(emptyEntry);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = () => adminContent.list().then(setEntries);

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (editingId) {
      await adminContent.update(editingId, form);
    } else {
      await adminContent.create(form);
    }
    setForm(emptyEntry);
    setEditingId(null);
    await load();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Site Content</h2>
      <p className="mb-4 text-sm text-slate-600">
        Key/value entries power hero copy, meta descriptions, and contact form text.
      </p>

      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded border p-4 md:grid-cols-2">
        <input
          className="rounded border px-3 py-2"
          placeholder="Key (e.g. hero.tagline)"
          value={form.key}
          onChange={(e) => setForm({ ...form, key: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Section (e.g. hero)"
          value={form.section}
          onChange={(e) => setForm({ ...form, section: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Admin label"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          required
        />
        <textarea
          className="rounded border px-3 py-2 md:col-span-2"
          rows={4}
          placeholder="Value"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
        />
        <button type="submit" className="rounded bg-red-700 px-4 py-2 text-white md:col-span-2">
          {editingId ? 'Update entry' : 'Add entry'}
        </button>
      </form>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry._id} className="rounded border p-4">
            <p className="font-medium">{entry.label}</p>
            <p className="text-xs text-slate-500">
              {entry.section} / {entry.key}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{entry.value}</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="text-sm text-blue-700"
                onClick={() => {
                  setEditingId(entry._id);
                  setForm({
                    key: entry.key,
                    section: entry.section,
                    label: entry.label,
                    value: entry.value,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-sm text-red-700"
                onClick={async () => {
                  if (window.confirm('Delete content entry?')) {
                    await adminContent.remove(entry._id);
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
