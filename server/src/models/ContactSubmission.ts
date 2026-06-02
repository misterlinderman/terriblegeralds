import mongoose, { Document, Schema } from 'mongoose';

export type ContactStatus = 'new' | 'read' | 'archived';

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  phone: string;
  eventDate: Date;
  location: string;
  guestCount: string;
  referralSource: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    guestCount: { type: String, required: true, trim: true },
    referralSource: { type: String, required: true, trim: true },
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

export const ContactSubmission = mongoose.model<IContactSubmission>(
  'ContactSubmission',
  contactSubmissionSchema
);
