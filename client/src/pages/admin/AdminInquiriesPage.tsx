import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { adminContact } from '../../services/adminApi';
import { getAdminRequestError } from '../../hooks/useAdminApiReady';
import type { ContactStatus, ContactSubmission } from '../../types';

export default function AdminInquiriesPage() {
  const { user } = useAuth0();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filter, setFilter] = useState<ContactStatus | 'all'>('all');
  const [error, setError] = useState('');

  const load = () =>
    adminContact
      .list(filter === 'all' ? undefined : filter)
      .then(setSubmissions)
      .catch((err) => setError(getAdminRequestError(err, user?.email)));

  useEffect(() => {
    load();
  }, [filter]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Private Event Inquiries</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <div className="mb-4 flex gap-2">
        {(['all', 'new', 'read', 'archived'] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded px-3 py-1 text-sm ${
              filter === status ? 'bg-red-700 text-white' : 'border text-slate-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {submissions.length === 0 && (
          <p className="text-sm text-slate-600">No inquiries in this view.</p>
        )}
        {submissions.map((submission) => (
          <div key={submission._id} className="rounded border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{submission.name}</p>
                <p className="text-sm text-slate-600">
                  {submission.email} · {submission.phone}
                </p>
                <p className="mt-2 text-sm">
                  {new Date(submission.eventDate).toLocaleDateString()} at {submission.location} ·{' '}
                  {submission.guestCount} guests
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm">{submission.message}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Referral: {submission.referralSource} · Submitted{' '}
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <select
                  className="rounded border px-2 py-1 text-sm"
                  value={submission.status}
                  onChange={async (e) => {
                    await adminContact.updateStatus(
                      submission._id,
                      e.target.value as ContactStatus
                    );
                    await load();
                  }}
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="archived">Archived</option>
                </select>
                <button
                  type="button"
                  className="text-sm text-red-700"
                  onClick={async () => {
                    if (window.confirm('Delete inquiry?')) {
                      await adminContact.remove(submission._id);
                      await load();
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
