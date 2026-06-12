import type { ContactInquiryType } from '../models/ContactSubmission';

export interface ContactInquiryDetails {
  inquiryType: ContactInquiryType;
  name: string;
  email: string;
  phone: string;
  eventDate?: Date;
  location?: string;
  eventZip?: string;
  guestCount?: string;
  referralSource?: string;
  message: string;
}

const DEFAULT_NOTIFICATION_EMAIL = 'terriblegeralds@gmail.com';
const DEFAULT_FROM_EMAIL = "Terrible Gerald's Pizza <inquiries@terriblegeralds.com>";

function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Chicago',
  });
}

function buildEmailBody(details: ContactInquiryDetails): { subject: string; text: string } {
  const isCatering = details.inquiryType === 'catering';
  const intro = isCatering
    ? "New private event inquiry from the Terrible Gerald's website:"
    : "New general contact inquiry from the Terrible Gerald's website:";

  const lines = [
    intro,
    '',
    `Type: ${isCatering ? 'Private event / catering' : 'General contact'}`,
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
  ];

  if (isCatering && details.eventDate) {
    lines.push(`Event date: ${formatEventDate(details.eventDate)}`);
    lines.push(`Location: ${details.location || '—'}`);
    lines.push(`Event zip code: ${details.eventZip || '—'}`);
    lines.push(`Guest count: ${details.guestCount || '—'}`);
    lines.push(`How they heard about us: ${details.referralSource || '—'}`);
  }

  lines.push('', 'Message:', details.message);

  const subject = isCatering
    ? `[Private Event / Catering] Inquiry from ${details.name}`
    : `[General Contact] Message from ${details.name}`;

  return {
    subject,
    text: lines.join('\n'),
  };
}

export async function sendContactInquiryEmail(details: ContactInquiryDetails): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set; skipping contact inquiry email notification.');
    return;
  }

  const to = process.env.CONTACT_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM || DEFAULT_FROM_EMAIL;
  const { subject, text } = buildEmailBody(details);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, reply_to: details.email, subject, text }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to send contact inquiry email (${response.status}): ${errorBody}`);
  }
}
