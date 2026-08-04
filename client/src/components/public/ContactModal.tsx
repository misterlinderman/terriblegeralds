import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from '../marketing/Button';
import { useContactModal } from '../../hooks/useContactModal';
import { fetchSiteContent, submitContactForm, validateEventZip } from '../../services/contentApi';
import type { ContactFormData, ContactInquiryType } from '../../types';

const GENERAL_TOPICS = [
  'General Question',
  'Press / Media',
  'Merch',
  'Feedback (Nice)',
  'Feedback (Terrible)',
  'Something Else',
] as const;

const emptyForm = (inquiryType: ContactInquiryType): ContactFormData => ({
  inquiryType,
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  location: '',
  eventZip: '',
  guestCount: '',
  referralSource: inquiryType === 'general' ? GENERAL_TOPICS[0] : '',
  message: '',
});

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

export default function ContactModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, inquiryType: openedInquiryType, closeContact } = useContactModal();
  const [form, setForm] = useState<ContactFormData>(emptyForm('catering'));
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
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
      setFieldErrors({});
      setError('');
      setZipStatus(null);
      setSubmitted(false);
    }
  }, [isOpen, openedInquiryType]);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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
    setFieldErrors({});
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
        setFieldErrors((prev) => ({ ...prev, eventZip: undefined }));
      } else {
        setZipStatus({
          valid: false,
          message: result.message || 'That zip code is outside our travel area.',
        });
        setFieldErrors((prev) => ({
          ...prev,
          eventZip: result.message || 'That zip code is outside our travel area.',
        }));
      }
    } catch {
      setZipStatus(null);
    } finally {
      setZipChecking(false);
    }
  };

  const validate = async (): Promise<FieldErrors> => {
    const errs: FieldErrors = {};

    if (!form.name.trim()) {
      errs.name = isCatering ? 'We need a name to put on the quote.' : 'A name would help.';
    }

    if (!form.email.trim()) {
      errs.email = isCatering
        ? 'How else would we send you terrible news (a quote)?'
        : "We can't reply into the void.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = isCatering ? "That doesn't look like a real email." : 'That email looks off.';
    }

    if (!form.phone.trim()) {
      errs.phone = 'We need a number in case we have to call about your message.';
    }

    if (isCatering) {
      if (!form.eventDate) errs.eventDate = 'Pick a date, even a rough one.';
      if (!form.location.trim()) errs.location = 'Where is this happening?';
      if (!form.guestCount.trim()) errs.guestCount = 'How many mouths are we feeding?';
      if (!form.referralSource.trim()) {
        errs.referralSource = 'How did you hear about us?';
      }

      if (!form.eventZip.trim()) {
        errs.eventZip = 'We need a zip to check travel range.';
      } else {
        try {
          const result = await validateEventZip(form.eventZip.trim());
          if (!result.valid) {
            errs.eventZip = result.message || 'That zip code is outside our travel area.';
          }
        } catch {
          // Allow submit attempt if validation service is unavailable
        }
      }
    }

    if (!form.message.trim() || form.message.trim().length < 8) {
      errs.message = isCatering
        ? 'Give us a little more to go on.'
        : 'Give us a little more to go on.';
    }

    return errs;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const errs = await validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (isCatering && zipStatus && !zipStatus.valid) {
      setError(zipStatus.message);
      return;
    }

    setLoading(true);

    try {
      await submitContactForm(form);
      setSubmitted(true);
      setForm(emptyForm(form.inquiryType));
      setFieldErrors({});
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

  const fieldClass = (field: keyof ContactFormData) =>
    `field${fieldErrors[field] ? ' invalid' : ''}`;

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
            <h3>{isCatering ? 'Quote Requested ✓' : 'Message Sent ✓'}</h3>
            <p>
              {isCatering
                ? "Thanks. We'll get back to you in 1–2 days with a quote — longer if we're mid-service and covered in flour."
                : "Thanks. We read every message — replies usually take 1–2 days, sometimes longer if we're mid-service and covered in flour."}
            </p>
            <div style={{ marginTop: 18 }}>
              <Button
                variant="ink"
                onClick={() => {
                  setSubmitted(false);
                  setForm(emptyForm(form.inquiryType));
                  setFieldErrors({});
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
                <div className={fieldClass(field)} key={field}>
                  <label htmlFor={`modal-${field}`}>{label} *</label>
                  <input
                    id={`modal-${field}`}
                    type={type}
                    name={field}
                    value={form[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                  <div className="err">{fieldErrors[field]}</div>
                </div>
              ))}
            </div>

            <div className={fieldClass('phone')}>
              <label htmlFor="modal-phone">Phone *</label>
              <input
                id="modal-phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              <div className="err">{fieldErrors.phone}</div>
            </div>

            {!isCatering && (
              <div className="field">
                <label htmlFor="modal-topic">Topic</label>
                <select
                  id="modal-topic"
                  value={form.referralSource}
                  onChange={(e) => handleChange('referralSource', e.target.value)}
                >
                  {GENERAL_TOPICS.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            )}

            {isCatering && (
              <>
                <div className={fieldClass('eventZip')}>
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
                  />
                  {zipChecking && (
                    <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)', marginTop: 5 }}>
                      Checking travel area…
                    </div>
                  )}
                  {zipStatus && !fieldErrors.eventZip && (
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
                  <div className="err">{fieldErrors.eventZip}</div>
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
                    <div className={fieldClass(field)} key={field}>
                      <label htmlFor={`modal-${field}`}>{label} *</label>
                      <input
                        id={`modal-${field}`}
                        type={type}
                        name={field}
                        value={form[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                      <div className="err">{fieldErrors[field]}</div>
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
                    <div className={fieldClass(field)} key={field}>
                      <label htmlFor={`modal-${field}`}>{label} *</label>
                      <input
                        id={`modal-${field}`}
                        type={type}
                        name={field}
                        value={form[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                      <div className="err">{fieldErrors[field]}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className={fieldClass('message')}>
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
              />
              <div className="err">{fieldErrors.message}</div>
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
