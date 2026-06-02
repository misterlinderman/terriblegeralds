import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  venue: string;
  address?: string;
  startDate: Date;
  endDate?: Date;
  mapUrl?: string;
  ticketUrl?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, default: '', trim: true },
    venue: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    mapUrl: { type: String, trim: true },
    ticketUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

eventSchema.index({ published: 1, startDate: 1 });
eventSchema.index({ slug: 1 });

export const Event = mongoose.model<IEvent>('Event', eventSchema);
