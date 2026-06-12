import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
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
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [zipStatus, setZipStatus] = useState<{ message: string; valid: boolean } | null>(null);
  const [zipChecking, setZipChecking] = useState(false);
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
      setSuccess('');
      setZipStatus(null);
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
    setSuccess('');

    if (isCatering && zipStatus && !zipStatus.valid) {
      setError(zipStatus.message);
      return;
    }

    setLoading(true);

    try {
      await submitContactForm(form);
      setSuccess('Thanks! We received your inquiry and will be in touch soon.');
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
    <div id="full-screen-wrap">
      <div>
        <div className="container">
          <dialog
            ref={dialogRef}
            onClose={closeContact}
            onClick={(event) => {
              if (event.target === dialogRef.current) closeContact();
            }}
          >
            <div className="close-contact-form-wrap">
              <div className="logo-close-button-wrap">
                <img src="/images/tg-logo.webp" alt="Terrible Gerald's Logo" />
                <button type="button" className="close-contact-form" onClick={closeContact}>
                  X
                </button>
              </div>
              {copy.licenseNotice && <p>{copy.licenseNotice}</p>}
              {isCatering && copy.bookingBlurb && <p>{copy.bookingBlurb}</p>}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="items">
                <div className="contact-inquiry-type">
                  <p className="contact-inquiry-type-label">What can we help with?</p>
                  <div className="contact-inquiry-type-options" role="radiogroup" aria-label="Inquiry type">
                    <label
                      className={`contact-inquiry-type-option${
                        form.inquiryType === 'general' ? ' is-selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="inquiryType"
                        value="general"
                        checked={form.inquiryType === 'general'}
                        onChange={() => handleInquiryTypeChange('general')}
                      />
                      <span className="contact-inquiry-type-text">General contact</span>
                    </label>
                    <label
                      className={`contact-inquiry-type-option${
                        form.inquiryType === 'catering' ? ' is-selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="inquiryType"
                        value="catering"
                        checked={form.inquiryType === 'catering'}
                        onChange={() => handleInquiryTypeChange('catering')}
                      />
                      <span className="contact-inquiry-type-text">Private event / catering</span>
                    </label>
                  </div>
                </div>

                {(
                  [
                    ['name', 'Name', 'text'],
                    ['email', 'Email Address', 'email'],
                    ['phone', 'Phone Number', 'tel'],
                  ] as const
                ).map(([field, label, type]) => (
                  <div key={field}>
                    <label htmlFor={field}>{label}</label>
                    <input
                      id={field}
                      type={type}
                      name={field}
                      value={form[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      required
                    />
                  </div>
                ))}

                {isCatering && (
                  <>
                    <div>
                      <label htmlFor="eventZip">Event Zip Code</label>
                      <input
                        id="eventZip"
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
                        <span className="contact-zip-hint">Checking travel area…</span>
                      )}
                      {zipStatus && (
                        <span
                          className={zipStatus.valid ? 'contact-zip-valid' : 'contact-zip-invalid'}
                        >
                          {zipStatus.message}
                        </span>
                      )}
                      <span className="contact-zip-hint">
                        We travel up to 40 miles from Omaha (4924 Grant St).
                      </span>
                    </div>
                    {(
                      [
                        ['eventDate', 'Event Date', 'date'],
                        ['location', 'Event Location', 'text'],
                        ['guestCount', 'Estimated Guest Count', 'text'],
                        ['referralSource', 'How Did You Hear About Us?', 'text'],
                      ] as const
                    ).map(([field, label, type]) => (
                      <div key={field}>
                        <label htmlFor={field}>{label}</label>
                        <input
                          id={field}
                          type={type}
                          name={field}
                          value={form[field]}
                          onChange={(e) => handleChange(field, e.target.value)}
                          required
                        />
                      </div>
                    ))}
                  </>
                )}

                <div>
                  <label htmlFor="message">{isCatering ? 'Additional Info' : 'Message'}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                  />
                </div>
                {error && <span className="error">{error}</span>}
                {success && <span className="success">{success}</span>}
                <button type="submit" className="btn btn-secondary" disabled={loading || zipChecking}>
                  {loading ? 'Sending…' : 'Submit'}
                </button>
              </div>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
}
