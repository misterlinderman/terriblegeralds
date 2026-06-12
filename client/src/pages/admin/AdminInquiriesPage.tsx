import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { adminContact } from '../../services/adminApi';
import { getAdminRequestError } from '../../hooks/useAdminApiReady';
import type { ContactInquiryType, ContactStatus, ContactSubmission } from '../../types';

type StatusFilter = ContactStatus | 'all';
type TypeFilter = ContactInquiryType | 'all';

function resolveInquiryType(submission: ContactSubmission): ContactInquiryType {
  return submission.inquiryType === 'general' ? 'general' : 'catering';
}

function inquiryTypeLabel(type: ContactInquiryType): string {
  return type === 'catering' ? 'Private event' : 'General contact';
}

function inquiryTypeBadgeClass(type: ContactInquiryType): string {
  return type === 'catering'
    ? 'rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800'
    : 'rounded bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-800';
}

export default function AdminInquiriesPage() {
  const { user } = useAuth0();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [error, setError] = useState('');

  const load = () =>
    adminContact
      .list({
        status: statusFilter === 'all' ? undefined : statusFilter,
        inquiryType: typeFilter === 'all' ? undefined : typeFilter,
      })
      .then(setSubmissions)
      .catch((err) => setError(getAdminRequestError(err, user?.email)));

  useEffect(() => {
    load();
  }, [statusFilter, typeFilter]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Contact Inquiries</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="mb-3">
        <p className="mb-2 text-sm font-medium text-slate-700">Type</p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['all', 'All types'],
              ['general', 'General contact'],
              ['catering', 'Private event'],
            ] as const
          ).map(([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`rounded px-3 py-1 text-sm ${
                typeFilter === type ? 'bg-red-700 text-white' : 'border text-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-slate-700">Status</p>
        <div className="flex flex-wrap gap-2">
          {(['all', 'new', 'read', 'archived'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded px-3 py-1 text-sm ${
                statusFilter === status ? 'bg-red-700 text-white' : 'border text-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 && (
          <p className="text-sm text-slate-600">No inquiries in this view.</p>
        )}
        {submissions.map((submission) => {
          const inquiryType = resolveInquiryType(submission);

          return (
            <div key={submission._id} className="rounded border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{submission.name}</p>
                    <span className={inquiryTypeBadgeClass(inquiryType)}>
                      {inquiryTypeLabel(inquiryType)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {submission.email} · {submission.phone}
                  </p>
                  {inquiryType === 'catering' && submission.eventDate && (
                    <p className="mt-2 text-sm">
                      {new Date(submission.eventDate).toLocaleDateString()} at{' '}
                      {submission.location || '—'} · {submission.guestCount || '—'} guests
                      {submission.eventZip ? ` · Zip ${submission.eventZip}` : ''}
                    </p>
                  )}
                  <p className="mt-2 whitespace-pre-wrap text-sm">{submission.message}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {submission.referralSource
                      ? `Referral: ${submission.referralSource} · `
                      : ''}
                    Submitted {new Date(submission.createdAt).toLocaleString()}
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
          );
        })}
      </div>
    </div>
  );
}
