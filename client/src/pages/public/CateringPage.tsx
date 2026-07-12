import axios from 'axios';
import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/marketing/Button';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import SectionHeader from '../../components/marketing/SectionHeader';
import {
  fetchCateringSteps,
  fetchCateringTiers,
  submitContactForm,
  validateEventZip,
} from '../../services/contentApi';
import type { CateringStep, CateringTier } from '../../types';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  type: 'Wedding',
  guests: '',
  city: '',
  eventZip: '',
  message: '',
};

type FormErrors = Partial<Record<keyof typeof initialForm, string>>;

export default function CateringPage() {
  const [tiers, setTiers] = useState<CateringTier[]>([]);
  const [steps, setSteps] = useState<CateringStep[]>([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([fetchCateringTiers(), fetchCateringSteps()])
      .then(([tierData, stepData]) => {
        setTiers(tierData);
        setSteps(stepData);
      })
      .catch((error) => console.error('Failed to load catering content:', error));
  }, []);

  const set =
    (key: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const validate = async () => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'We need a name to put on the quote.';
    if (!form.email.trim()) errs.email = 'How else would we send you terrible news (a quote)?';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "That doesn't look like a real email.";
    }
    if (!form.date) errs.date = 'Pick a date, even a rough one.';
    if (!form.guests || Number(form.guests) < 1) {
      errs.guests = 'How many mouths are we feeding?';
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
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const errs = await validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await submitContactForm({
        inquiryType: 'catering',
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        eventDate: form.date,
        location: form.city.trim(),
        eventZip: form.eventZip.trim(),
        guestCount: form.guests,
        referralSource: form.type,
        message: [
          form.message.trim(),
          `Event type: ${form.type}`,
          form.city.trim() ? `City / venue: ${form.city.trim()}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      });
      setSubmitted(true);
    } catch (err) {
      const message =
        axios.isAxiosError(err) && typeof err.response?.data?.message === 'string'
          ? err.response.data.message
          : 'Something went wrong. Please try again.';
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="brand-site">
      <div className="pg-hero">
        <div className="wrap">
          <span className="kicker">we bring the terrible</span>
          <h1>Catering &amp; Events</h1>
          <p>
            We roll the wood-fired trailer to your thing and feed your people fresh,
            blistered pies on-site. Weddings, offices, festivals, backyard chaos — we&apos;ve
            seen it all and made pizza through most of it.
          </p>
        </div>
      </div>

      <section className="pg">
        <div className="wrap">
          <SectionHeader kicker="pick a size, we'll do the rest" title="Packages" />
          <div className="tier-grid">
            {tiers.map((tier, i) => (
              <div className="tier" key={i}>
                <h3>{tier.name}</h3>
                <div className="price">{tier.price}</div>
                <ul>
                  {tier.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <SectionHeader kicker="how it works" title="From Ask to Ovens On" />
          <div className="steps">
            {steps.map((step, i) => (
              <div className="step" key={i}>
                <div className="num">{step.number}</div>
                <div className="t">{step.title}</div>
                <div className="d">{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg">
        <div className="wrap split">
          <div>
            <SectionHeader
              kicker="tell us the date, the headcount, and the chaos level"
              title="Get a Quote"
            />
            {submitted ? (
              <div className="confirm-panel">
                <h3>Quote Requested ✓</h3>
                <p>
                  Thanks, {form.name.split(' ')[0] || 'friend'}. We&apos;ll email {form.email}{' '}
                  within 1–2 business days with pricing for {form.date || 'your date'}. In the
                  meantime, go stare at <Link to="/menu">the menu</Link> and start narrowing down
                  pizzas.
                </p>
                <div style={{ marginTop: 18 }}>
                  <Button
                    variant="ink"
                    onClick={() => {
                      setForm(initialForm);
                      setSubmitted(false);
                    }}
                  >
                    Submit Another Request
                  </Button>
                </div>
              </div>
            ) : (
              <form className="gform" onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className={`field${errors.name ? ' invalid' : ''}`}>
                    <label htmlFor="c-name">Name *</label>
                    <input id="c-name" value={form.name} onChange={set('name')} />
                    <div className="err">{errors.name}</div>
                  </div>
                  <div className={`field${errors.email ? ' invalid' : ''}`}>
                    <label htmlFor="c-email">Email *</label>
                    <input id="c-email" type="email" value={form.email} onChange={set('email')} />
                    <div className="err">{errors.email}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="field">
                    <label htmlFor="c-phone">Phone</label>
                    <input id="c-phone" type="tel" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div className={`field${errors.date ? ' invalid' : ''}`}>
                    <label htmlFor="c-date">Event Date *</label>
                    <input id="c-date" type="date" value={form.date} onChange={set('date')} />
                    <div className="err">{errors.date}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="field">
                    <label htmlFor="c-type">Event Type</label>
                    <select id="c-type" value={form.type} onChange={set('type')}>
                      {['Wedding', 'Corporate', 'Festival / Market', 'Private Party', 'Other'].map(
                        (option) => (
                          <option key={option}>{option}</option>
                        )
                      )}
                    </select>
                  </div>
                  <div className={`field${errors.guests ? ' invalid' : ''}`}>
                    <label htmlFor="c-guests">Guest Count *</label>
                    <input
                      id="c-guests"
                      type="number"
                      min="1"
                      value={form.guests}
                      onChange={set('guests')}
                    />
                    <div className="err">{errors.guests}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="field">
                    <label htmlFor="c-city">City / Venue</label>
                    <input
                      id="c-city"
                      value={form.city}
                      onChange={set('city')}
                      placeholder="Omaha, NE — or the venue name"
                    />
                  </div>
                  <div className={`field${errors.eventZip ? ' invalid' : ''}`}>
                    <label htmlFor="c-zip">Event Zip Code *</label>
                    <input
                      id="c-zip"
                      value={form.eventZip}
                      onChange={set('eventZip')}
                      placeholder="68104"
                    />
                    <div className="err">{errors.eventZip}</div>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="c-msg">Tell us how weird you want it</label>
                  <textarea
                    id="c-msg"
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Dietary needs, timeline, whether Gerald needs to make an appearance..."
                  />
                </div>
                {submitError && (
                  <p style={{ color: 'var(--red-deep)', fontWeight: 700, fontSize: '.85rem' }}>
                    {submitError}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="red"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={loading}
                >
                  {loading ? 'Sending…' : 'Request a Quote →'}
                </Button>
              </form>
            )}
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <PlaceholderBox label="SETUP PHOTO — trailer at a wedding" aspect="4/3" />
            <PlaceholderBox label="plated pies, event service" aspect="4/3" />
          </div>
        </div>
      </section>
    </div>
  );
}
