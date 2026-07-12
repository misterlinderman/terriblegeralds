import { FormEvent, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { adminCateringTiers } from '../../services/adminApi';
import { getAdminRequestError } from '../../hooks/useAdminApiReady';
import type { CateringTier } from '../../types';

const emptyTier = {
  name: '',
  price: '',
  includesText: '',
  blurb: '',
  sortOrder: 0,
  active: true,
};

const includesToText = (includes: string[]): string => includes.join('\n');
const textToIncludes = (text: string): string[] =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export default function AdminCateringTiersPage() {
  const { user } = useAuth0();
  const [tiers, setTiers] = useState<CateringTier[]>([]);
  const [form, setForm] = useState(emptyTier);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = () =>
    adminCateringTiers
      .list()
      .then(setTiers)
      .catch((err) => setError(getAdminRequestError(err, user?.email)));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    const payload = {
      name: form.name,
      price: form.price,
      includes: textToIncludes(form.includesText),
      blurb: form.blurb || undefined,
      sortOrder: form.sortOrder,
      active: form.active,
    };

    try {
      if (editingId) {
        await adminCateringTiers.update(editingId, payload);
      } else {
        await adminCateringTiers.create(payload);
      }
      setForm(emptyTier);
      setEditingId(null);
      await load();
    } catch {
      setError('Could not save catering tier.');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Catering Tiers</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded border p-4 md:grid-cols-2">
        <input
          className="rounded border px-3 py-2"
          placeholder="Name (e.g. The Backyard)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Price (e.g. From $650)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <textarea
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Includes (one per line)"
          rows={5}
          value={form.includesText}
          onChange={(e) => setForm({ ...form, includesText: e.target.value })}
          required
        />
        <textarea
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Blurb (optional)"
          rows={2}
          value={form.blurb}
          onChange={(e) => setForm({ ...form, blurb: e.target.value })}
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
          {editingId ? 'Update tier' : 'Add tier'}
        </button>
      </form>

      <div className="space-y-3">
        {tiers.map((tier) => (
          <div key={tier._id} className="flex items-start justify-between rounded border p-4">
            <div>
              <p className="font-medium">{tier.name}</p>
              <p className="text-sm text-red-700">{tier.price}</p>
              {tier.blurb && <p className="mt-1 text-sm text-slate-600">{tier.blurb}</p>}
              <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
                {tier.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-sm text-blue-700"
                onClick={() => {
                  setEditingId(tier._id);
                  setForm({
                    name: tier.name,
                    price: tier.price,
                    includesText: includesToText(tier.includes),
                    blurb: tier.blurb || '',
                    sortOrder: tier.sortOrder,
                    active: tier.active,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-sm text-red-700"
                onClick={async () => {
                  if (window.confirm('Delete catering tier?')) {
                    await adminCateringTiers.remove(tier._id);
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
