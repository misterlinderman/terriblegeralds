import { FormEvent, useEffect, useState } from 'react';
import { adminFaqs } from '../../services/adminApi';
import type { Faq } from '../../types';

const emptyFaq = { question: '', answer: '', sortOrder: 0, published: true };

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [form, setForm] = useState(emptyFaq);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = () => adminFaqs.list().then(setFaqs);

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (editingId) {
      await adminFaqs.update(editingId, form);
    } else {
      await adminFaqs.create(form);
    }
    setForm(emptyFaq);
    setEditingId(null);
    await load();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">FAQs</h2>
      <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded border p-4">
        <input
          className="rounded border px-3 py-2"
          placeholder="Question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          required
        />
        <textarea
          className="rounded border px-3 py-2"
          rows={4}
          placeholder="Answer"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          required
        />
        <div className="flex items-center gap-4">
          <input
            type="number"
            className="w-32 rounded border px-3 py-2"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Published
          </label>
          <button type="submit" className="rounded bg-red-700 px-4 py-2 text-white">
            {editingId ? 'Update FAQ' : 'Add FAQ'}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq._id} className="rounded border p-4">
            <p className="font-medium">{faq.question}</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{faq.answer}</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="text-sm text-blue-700"
                onClick={() => {
                  setEditingId(faq._id);
                  setForm({
                    question: faq.question,
                    answer: faq.answer,
                    sortOrder: faq.sortOrder,
                    published: faq.published,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-sm text-red-700"
                onClick={async () => {
                  if (window.confirm('Delete FAQ?')) {
                    await adminFaqs.remove(faq._id);
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
