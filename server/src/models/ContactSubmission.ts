import mongoose, { Document, Schema } from 'mongoose';

export type ContactStatus = 'new' | 'read' | 'archived';
export type ContactInquiryType = 'general' | 'catering';

export interface IContactSubmission extends Document {
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
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactSubmissionSchema = new Schema<IContactSubmission>(
  {
    inquiryType: {
      type: String,
      enum: ['general', 'catering'],
      required: true,
      default: 'catering',
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    eventDate: { type: Date },
    location: { type: String, trim: true },
    eventZip: { type: String, trim: true },
    guestCount: { type: String, trim: true },
    referralSource: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'read', 'archived'],
      default: 'new',
    },
  },
  { timestamps: true }
);

contactSubmissionSchema.index({ status: 1, createdAt: -1 });
contactSubmissionSchema.index({ inquiryType: 1, createdAt: -1 });

export const ContactSubmission = mongoose.model<IContactSubmission>(
  'ContactSubmission',
  contactSubmissionSchema
);
