import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from '../marketing/Button';
import { useContactModal } from '../../context/ContactModalContext';
import { fetchSiteContent, submitContactForm, validateEventZip } from '../../services/contentApi';
import type { ContactFormData, ContactInquiryType } from '../../types';

const emptyForm = (inquiryType: ContactInquiryType): ContactFormData => ({
  inquiryType,
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  location: '',
  eventZip: '',
  guestCount: '',
  referralSource: '',
  message: '',
});

export default function ContactModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, inquiryType: openedInquiryType, closeContact } = useContactModal();
  const [form, setForm] = useState<ContactFormData>(emptyForm('catering'));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [zipStatus, setZipStatus] = useState<{ message: string; valid: boolean } | null>(null);
  const [zipChecking, setZipChecking] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copy, setCopy] = useState({ licenseNotice: '', bookingBlurb: '' });

  const isCatering = form.inquiryType === 'catering';

  useEffect(() => {
    fetchSiteContent()
      .then((content) => {
        setCopy({
          licenseNotice: content['contact.licenseNotice'] || '',
          bookingBlurb: content['contact.bookingBlurb'] || '',
        });
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setForm(emptyForm(openedInquiryType));
      setError('');
      setZipStatus(null);
      setSubmitted(false);
    }
  }, [isOpen, openedInquiryType]);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'eventZip') {
      setZipStatus(null);
    }
  };

  const handleInquiryTypeChange = (nextType: ContactInquiryType) => {
    setForm((prev) => ({
      ...emptyForm(nextType),
      name: prev.name,
      email: prev.email,
      phone: prev.phone,
      message: prev.message,
    }));
    setError('');
    setZipStatus(null);
    setSubmitted(false);
  };

  const handleZipBlur = async () => {
    const zip = form.eventZip.trim();
    if (!zip) {
      setZipStatus(null);
      return;
    }

    setZipChecking(true);
    try {
      const result = await validateEventZip(zip);
      if (result.valid) {
        setZipStatus({
          valid: true,
          message:
            result.distanceMiles !== undefined
              ? `Looks good — about ${result.distanceMiles} miles from our Omaha base.`
              : 'Looks good — within our travel area.',
        });
      } else {
        setZipStatus({
          valid: false,
          message: result.message || 'That zip code is outside our travel area.',
        });
      }
    } catch {
      setZipStatus(null);
    } finally {
      setZipChecking(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (isCatering && zipStatus && !zipStatus.valid) {
      setError(zipStatus.message);
      return;
    }

    setLoading(true);

    try {
      await submitContactForm(form);
      setSubmitted(true);
      setForm(emptyForm(form.inquiryType));
      setZipStatus(null);
    } catch (err) {
      const message =
        axios.isAxiosError(err) && typeof err.response?.data?.message === 'string'
          ? err.response.data.message
          : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="contact-dialog brand-site"
      onClose={closeContact}
      onClick={(event) => {
        if (event.target === dialogRef.current) closeContact();
      }}
    >
      <div className="contact-dialog-header">
        <div>
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              color: 'var(--red)',
              fontSize: '.95rem',
              display: 'block',
              marginBottom: 4,
            }}
          >
            say something (nice or terrible)
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase',
              fontSize: '1.6rem',
              letterSpacing: 'var(--display-tracking)',
              margin: 0,
            }}
          >
            Get in Touch
          </h2>
        </div>
        <button
          type="button"
          className="contact-dialog-close"
          aria-label="Close contact form"
          onClick={closeContact}
        >
          ×
        </button>
      </div>

      <div className="contact-dialog-body">
        {copy.licenseNotice && (
          <p style={{ fontSize: '.88rem', color: 'var(--ink-soft)', marginTop: 0 }}>
            {copy.licenseNotice}
          </p>
        )}
        {isCatering && copy.bookingBlurb && (
          <p style={{ fontSize: '.88rem', color: 'var(--ink-soft)' }}>{copy.bookingBlurb}</p>
        )}

        {submitted ? (
          <div className="confirm-panel">
            <h3>Message Sent ✓</h3>
            <p>
              Thanks. We read every message — replies usually take 1–2 days, sometimes longer if
              we&apos;re mid-service and covered in flour.
            </p>
            <div style={{ marginTop: 18 }}>
              <Button
                variant="ink"
                onClick={() => {
                  setSubmitted(false);
                  setForm(emptyForm(form.inquiryType));
                }}
              >
                Send Another
              </Button>
            </div>
          </div>
        ) : (
          <form className="gform" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label>What can we help with?</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {(['general', 'catering'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInquiryTypeChange(type)}
                    style={{
                      fontFamily: 'var(--font-display)',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--button-tracking)',
                      fontSize: '.78rem',
                      padding: '8px 14px',
                      borderRadius: 20,
                      border: '2px solid var(--ink)',
                      background: form.inquiryType === type ? 'var(--ink)' : 'var(--cream)',
                      color: form.inquiryType === type ? 'var(--cream)' : 'var(--ink)',
                      cursor: 'pointer',
                    }}
                  >
                    {type === 'general' ? 'General contact' : 'Private event / catering'}
                  </button>
                ))}
              </div>
            </div>

            <div className="row">
              {(
                [
                  ['name', 'Name', 'text'],
                  ['email', 'Email Address', 'email'],
                ] as const
              ).map(([field, label, type]) => (
                <div className="field" key={field}>
                  <label htmlFor={`modal-${field}`}>{label} *</label>
                  <input
                    id={`modal-${field}`}
                    type={type}
                    name={field}
                    value={form[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="field">
              <label htmlFor="modal-phone">Phone *</label>
              <input
                id="modal-phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </div>

            {isCatering && (
              <>
                <div className={`field${zipStatus && !zipStatus.valid ? ' invalid' : ''}`}>
                  <label htmlFor="modal-eventZip">Event Zip Code *</label>
                  <input
                    id="modal-eventZip"
                    type="text"
                    name="eventZip"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={10}
                    placeholder="68104"
                    value={form.eventZip}
                    onChange={(e) => handleChange('eventZip', e.target.value)}
                    onBlur={handleZipBlur}
                    required
                  />
                  {zipChecking && (
                    <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)', marginTop: 5 }}>
                      Checking travel area…
                    </div>
                  )}
                  {zipStatus && (
                    <div
                      className="err"
                      style={{
                        display: 'block',
                        color: zipStatus.valid ? 'var(--teal)' : 'var(--red-deep)',
                      }}
                    >
                      {zipStatus.message}
                    </div>
                  )}
                  <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)', marginTop: 5 }}>
                    We travel up to 40 miles from Omaha (68104).
                  </div>
                </div>

                <div className="row">
                  {(
                    [
                      ['eventDate', 'Event Date', 'date'],
                      ['location', 'Event Location', 'text'],
                    ] as const
                  ).map(([field, label, type]) => (
                    <div className="field" key={field}>
                      <label htmlFor={`modal-${field}`}>{label} *</label>
                      <input
                        id={`modal-${field}`}
                        type={type}
                        name={field}
                        value={form[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="row">
                  {(
                    [
                      ['guestCount', 'Estimated Guest Count', 'text'],
                      ['referralSource', 'How Did You Hear About Us?', 'text'],
                    ] as const
                  ).map(([field, label, type]) => (
                    <div className="field" key={field}>
                      <label htmlFor={`modal-${field}`}>{label} *</label>
                      <input
                        id={`modal-${field}`}
                        type={type}
                        name={field}
                        value={form[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="field">
              <label htmlFor="modal-message">
                {isCatering ? 'Additional Info' : 'Message'} *
              </label>
              <textarea
                id="modal-message"
                name="message"
                rows={6}
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder={isCatering ? undefined : "What's on your mind?"}
                required
              />
            </div>

            {error && (
              <p style={{ color: 'var(--red-deep)', fontWeight: 700, fontSize: '.85rem' }}>
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="red"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={loading || zipChecking}
            >
              {loading ? 'Sending…' : 'Send Message →'}
            </Button>
          </form>
        )}
      </div>
    </dialog>
  );
}
