import { FormEvent, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { adminPressFeatures, adminTikTokFeatures } from '../../services/adminApi';
import { getAdminRequestError } from '../../hooks/useAdminApiReady';
import { useAdminLoad } from '../../hooks/useAdminLoad';
import type { PressFeature, TikTokFeature } from '../../types';

const emptyPress = {
  outlet: '',
  blurb: '',
  ctaLabel: '▶ Listen Now',
  thumbLabel: '🎙 photo',
  linkUrl: '',
  sortOrder: 0,
  active: true,
};

const emptyTikTok = {
  handle: '',
  views: '',
  linkUrl: '',
  sortOrder: 0,
  active: true,
};

export default function AdminPressFeaturesPage() {
  const { user } = useAuth0();
  const [pressFeatures, setPressFeatures] = useState<PressFeature[]>([]);
  const [tikTokFeatures, setTikTokFeatures] = useState<TikTokFeature[]>([]);
  const [pressForm, setPressForm] = useState(emptyPress);
  const [tikTokForm, setTikTokForm] = useState(emptyTikTok);
  const [editingPressId, setEditingPressId] = useState<string | null>(null);
  const [editingTikTokId, setEditingTikTokId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = () => {
    Promise.all([adminPressFeatures.list(), adminTikTokFeatures.list()])
      .then(([press, tiktok]) => {
        setPressFeatures(press);
        setTikTokFeatures(tiktok);
      })
      .catch((err) => setError(getAdminRequestError(err, user?.email)));
  };

  useAdminLoad(load);

  const handlePressSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    const payload = {
      ...pressForm,
      linkUrl: pressForm.linkUrl.trim() || undefined,
    };

    try {
      if (editingPressId) {
        await adminPressFeatures.update(editingPressId, payload);
      } else {
        await adminPressFeatures.create(payload);
      }
      setPressForm(emptyPress);
      setEditingPressId(null);
      load();
    } catch {
      setError('Could not save press feature.');
    }
  };

  const handleTikTokSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    const payload = {
      ...tikTokForm,
      linkUrl: tikTokForm.linkUrl.trim() || undefined,
    };

    try {
      if (editingTikTokId) {
        await adminTikTokFeatures.update(editingTikTokId, payload);
      } else {
        await adminTikTokFeatures.create(payload);
      }
      setTikTokForm(emptyTikTok);
      setEditingTikTokId(null);
      load();
    } catch {
      setError('Could not save TikTok feature.');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Press &amp; TikTok Features</h2>
      <p className="mb-6 text-sm text-slate-600">
        Powers the &quot;Testimonials of Terrible&quot; section on the home page — press cards and
        TikTok placeholders.
      </p>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <h3 className="mb-3 text-lg font-medium">Press features</h3>
      <form
        onSubmit={handlePressSubmit}
        className="mb-6 grid gap-3 rounded border p-4 md:grid-cols-2"
      >
        <input
          className="rounded border px-3 py-2"
          placeholder="Outlet (e.g. Hoppen Interview)"
          value={pressForm.outlet}
          onChange={(e) => setPressForm({ ...pressForm, outlet: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Thumb label (e.g. 🎙 photo)"
          value={pressForm.thumbLabel}
          onChange={(e) => setPressForm({ ...pressForm, thumbLabel: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Blurb (e.g. Sit-down with the homies)"
          value={pressForm.blurb}
          onChange={(e) => setPressForm({ ...pressForm, blurb: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="CTA label (e.g. ▶ Listen Now)"
          value={pressForm.ctaLabel}
          onChange={(e) => setPressForm({ ...pressForm, ctaLabel: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Link URL (optional)"
          value={pressForm.linkUrl}
          onChange={(e) => setPressForm({ ...pressForm, linkUrl: e.target.value })}
        />
        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Sort order"
          value={pressForm.sortOrder}
          onChange={(e) => setPressForm({ ...pressForm, sortOrder: Number(e.target.value) })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={pressForm.active}
            onChange={(e) => setPressForm({ ...pressForm, active: e.target.checked })}
          />
          Active on public site
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="rounded bg-red-700 px-4 py-2 text-white">
            {editingPressId ? 'Update' : 'Add'} press feature
          </button>
          {editingPressId && (
            <button
              type="button"
              className="rounded border px-4 py-2"
              onClick={() => {
                setPressForm(emptyPress);
                setEditingPressId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <ul className="mb-10 divide-y rounded border">
        {pressFeatures.map((feature) => (
          <li key={feature._id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{feature.outlet}</p>
              <p className="text-sm text-slate-600">
                {feature.thumbLabel} · {feature.blurb} · {feature.ctaLabel}
                {!feature.active && ' · inactive'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border px-3 py-1 text-sm"
                onClick={() => {
                  setEditingPressId(feature._id);
                  setPressForm({
                    outlet: feature.outlet,
                    blurb: feature.blurb,
                    ctaLabel: feature.ctaLabel,
                    thumbLabel: feature.thumbLabel,
                    linkUrl: feature.linkUrl || '',
                    sortOrder: feature.sortOrder,
                    active: feature.active,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded border border-red-200 px-3 py-1 text-sm text-red-700"
                onClick={async () => {
                  if (!window.confirm(`Delete "${feature.outlet}"?`)) return;
                  await adminPressFeatures.remove(feature._id);
                  load();
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="mb-3 text-lg font-medium">TikTok features</h3>
      <form
        onSubmit={handleTikTokSubmit}
        className="mb-6 grid gap-3 rounded border p-4 md:grid-cols-2"
      >
        <input
          className="rounded border px-3 py-2"
          placeholder="Handle (e.g. @emiliestrumlcin)"
          value={tikTokForm.handle}
          onChange={(e) => setTikTokForm({ ...tikTokForm, handle: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Views (e.g. 116K)"
          value={tikTokForm.views}
          onChange={(e) => setTikTokForm({ ...tikTokForm, views: e.target.value })}
          required
        />
        <input
          className="rounded border px-3 py-2 md:col-span-2"
          placeholder="Link URL (optional)"
          value={tikTokForm.linkUrl}
          onChange={(e) => setTikTokForm({ ...tikTokForm, linkUrl: e.target.value })}
        />
        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Sort order"
          value={tikTokForm.sortOrder}
          onChange={(e) => setTikTokForm({ ...tikTokForm, sortOrder: Number(e.target.value) })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={tikTokForm.active}
            onChange={(e) => setTikTokForm({ ...tikTokForm, active: e.target.checked })}
          />
          Active on public site
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="rounded bg-red-700 px-4 py-2 text-white">
            {editingTikTokId ? 'Update' : 'Add'} TikTok feature
          </button>
          {editingTikTokId && (
            <button
              type="button"
              className="rounded border px-4 py-2"
              onClick={() => {
                setTikTokForm(emptyTikTok);
                setEditingTikTokId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <ul className="divide-y rounded border">
        {tikTokFeatures.map((feature) => (
          <li key={feature._id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{feature.handle}</p>
              <p className="text-sm text-slate-600">
                {feature.views} views
                {!feature.active && ' · inactive'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border px-3 py-1 text-sm"
                onClick={() => {
                  setEditingTikTokId(feature._id);
                  setTikTokForm({
                    handle: feature.handle,
                    views: feature.views,
                    linkUrl: feature.linkUrl || '',
                    sortOrder: feature.sortOrder,
                    active: feature.active,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded border border-red-200 px-3 py-1 text-sm text-red-700"
                onClick={async () => {
                  if (!window.confirm(`Delete "${feature.handle}"?`)) return;
                  await adminTikTokFeatures.remove(feature._id);
                  load();
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
