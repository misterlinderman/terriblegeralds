import { useEffect, useRef, useState } from 'react';
import { useContactModal } from '../../context/ContactModalContext';
import { fetchSiteContent, submitContactForm } from '../../services/contentApi';
import type { ContactFormData } from '../../types';

const emptyForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  location: '',
  guestCount: '',
  referralSource: '',
  message: '',
};

export default function ContactModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, closeContact } = useContactModal();
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState({ licenseNotice: '', bookingBlurb: '' });

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
    if (!isOpen) {
      setForm(emptyForm);
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await submitContactForm(form);
      setSuccess('Thanks! We received your inquiry and will be in touch soon.');
      setForm(emptyForm);
    } catch {
      setError('Something went wrong. Please try again.');
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
              {copy.bookingBlurb && <p>{copy.bookingBlurb}</p>}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="items">
                {(
                  [
                    ['name', 'Name', 'text'],
                    ['email', 'Email Address', 'email'],
                    ['phone', 'Phone Number', 'tel'],
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
                <div>
                  <label htmlFor="message">Additional Info</label>
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
                <button type="submit" className="btn btn-secondary" disabled={loading}>
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
