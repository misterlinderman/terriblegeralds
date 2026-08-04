import { FormEvent, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { adminThemes } from '../../services/adminApi';
import { getAdminRequestError } from '../../hooks/useAdminApiReady';
import { useAdminLoad } from '../../hooks/useAdminLoad';
import { useSiteTheme } from '../../hooks/useSiteTheme';
import type { ThemeFormData } from '../../lib/themeTokens';
import {
  DEFAULT_THEME_TOKENS,
  themePresetToForm,
  themeToCssVars,
} from '../../lib/themeTokens';
import type { ThemePreset } from '../../types';

const COLOR_FIELDS: { key: keyof ThemeFormData; label: string }[] = [
  { key: 'bone', label: 'Bone (page background)' },
  { key: 'bone2', label: 'Bone 2 (panels)' },
  { key: 'cream', label: 'Cream (cards)' },
  { key: 'ink', label: 'Ink (text / borders)' },
  { key: 'inkSoft', label: 'Ink soft (secondary text)' },
  { key: 'red', label: 'Red (primary accent / buttons)' },
  { key: 'redDeep', label: 'Red deep (button shadow)' },
  { key: 'gold', label: 'Gold (highlights)' },
  { key: 'goldDeep', label: 'Gold deep (shadow)' },
  { key: 'teal', label: 'Teal (tertiary)' },
];

const FONT_FIELDS: { key: keyof ThemeFormData; label: string }[] = [
  { key: 'fontDisplay', label: 'Display font stack' },
  { key: 'fontEditorial', label: 'Editorial font stack' },
  { key: 'fontAccent', label: 'Accent font stack' },
  { key: 'fontBody', label: 'Body font stack' },
  { key: 'fontMono', label: 'Mono font stack' },
  { key: 'displayTracking', label: 'Display letter-spacing' },
  { key: 'buttonTracking', label: 'Button letter-spacing' },
];

const emptyForm: ThemeFormData = {
  ...DEFAULT_THEME_TOKENS,
};

function isHexColor(value: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}

export default function AdminThemesPage() {
  const { user } = useAuth0();
  const { refreshTheme } = useSiteTheme();
  const [themes, setThemes] = useState<ThemePreset[]>([]);
  const [form, setForm] = useState<ThemeFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const load = () =>
    adminThemes
      .list()
      .then(setThemes)
      .catch((err) => setError(getAdminRequestError(err, user?.email)));

  useAdminLoad(load);

  const previewVars = themeToCssVars(form);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setStatus('');

    try {
      if (editingId) {
        await adminThemes.update(editingId, form);
        setStatus('Theme preset saved.');
      } else {
        await adminThemes.create(form);
        setStatus('Theme preset created.');
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch {
      setError('Could not save theme preset.');
    }
  };

  const handleActivate = async (id: string) => {
    setError('');
    try {
      await adminThemes.activate(id);
      await refreshTheme();
      await load();
      setStatus('Active theme updated on the public site.');
    } catch {
      setError('Could not activate theme.');
    }
  };

  return (
    <div>
      <p className="admin-kicker mb-1">brand system</p>
      <h2 className="admin-heading mb-2">Theme Presets</h2>
      <p className="mb-4 text-sm" style={{ color: 'var(--ink-soft)' }}>
        Manual theme rotation for the public site — colors, fonts, and button accents. Activate
        one preset at a time; changes apply immediately after activation.
      </p>
      {error && <p className="admin-error mb-4">{error}</p>}
      {status && (
        <p
          className="mb-4 rounded border-2 px-3 py-2 text-sm"
          style={{ borderColor: 'var(--teal)', color: 'var(--ink)' }}
        >
          {status}
        </p>
      )}

      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_280px]">
        <form onSubmit={handleSubmit} className="admin-panel grid gap-4 p-4 md:grid-cols-2">
          <input
            className="admin-input md:col-span-2"
            placeholder="Preset name (e.g. Season 3 · Vol. 6)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="admin-input"
            type="number"
            placeholder="Sort order"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
          />
          <div className="text-sm" style={{ color: 'var(--ink-soft)' }}>
            Edit tokens below, then save. Use Activate on a saved preset to go live.
          </div>

          <h3 className="admin-kicker md:col-span-2 mt-2">Colors</h3>
          {COLOR_FIELDS.map(({ key, label }) => (
            <label key={key} className="grid gap-1 text-sm">
              <span>{label}</span>
              <div className="flex gap-2">
                {isHexColor(String(form[key])) && (
                  <input
                    type="color"
                    value={String(form[key])}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="h-10 w-12 cursor-pointer rounded border-2 border-ink"
                  />
                )}
                <input
                  className="admin-input flex-1"
                  value={String(form[key])}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            </label>
          ))}
          <label className="grid gap-1 text-sm md:col-span-2">
            <span>Paper line (border / divider)</span>
            <input
              className="admin-input"
              value={form.paperLine}
              onChange={(e) => setForm({ ...form, paperLine: e.target.value })}
            />
          </label>

          <h3 className="admin-kicker md:col-span-2 mt-2">Typography</h3>
          {FONT_FIELDS.map(({ key, label }) => (
            <label key={key} className="grid gap-1 text-sm md:col-span-2">
              <span>{label}</span>
              <input
                className="admin-input"
                value={String(form[key])}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </label>
          ))}

          <div className="flex flex-wrap gap-2 md:col-span-2">
            <button type="submit" className="admin-btn-primary">
              {editingId ? 'Update' : 'Create'} preset
            </button>
            {editingId && (
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="admin-panel p-4">
          <p className="admin-kicker mb-2">Live preview</p>
          <div
            className="rounded border-2 p-4"
            style={{
              ...previewVars,
              background: form.bone,
              borderColor: form.ink,
              color: form.ink,
              fontFamily: form.fontBody,
            }}
          >
            <p
              style={{
                fontFamily: form.fontDisplay,
                letterSpacing: form.displayTracking,
                fontSize: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              Terrible Gerald&apos;s
            </p>
            <p style={{ fontFamily: form.fontAccent, fontStyle: 'italic', color: form.red }}>
              unorthodox neapolitan
            </p>
            <div
              className="mt-3 rounded border-2 p-3"
              style={{ background: form.cream, borderColor: form.ink }}
            >
              Card on cream
            </div>
            <button
              type="button"
              className="mt-3 rounded px-3 py-1.5 text-sm font-semibold"
              style={{
                background: form.red,
                color: form.cream,
                boxShadow: `3px 3px 0 ${form.redDeep}`,
                letterSpacing: form.buttonTracking,
                fontFamily: form.fontDisplay,
              }}
            >
              Button
            </button>
          </div>
        </div>
      </div>

      <ul className="admin-panel divide-y">
        {themes.map((theme) => (
          <li key={theme._id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-semibold">
                {theme.name}{' '}
                {theme.active && <span className="admin-badge-active ml-1">Active</span>}
              </p>
              <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                {theme.red} · {theme.gold} · {theme.fontBody.split(',')[0]}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {!theme.active && theme._id && (
                <button
                  type="button"
                  className="admin-btn-primary"
                  onClick={() => handleActivate(theme._id!)}
                >
                  Activate
                </button>
              )}
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => {
                  if (!theme._id) return;
                  setEditingId(theme._id);
                  setForm(themePresetToForm(theme));
                }}
              >
                Edit
              </button>
              {!theme.active && theme._id && (
                <button
                  type="button"
                  className="admin-btn-danger"
                  onClick={async () => {
                    if (!window.confirm(`Delete "${theme.name}"?`)) return;
                    await adminThemes.remove(theme._id!);
                    await load();
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
