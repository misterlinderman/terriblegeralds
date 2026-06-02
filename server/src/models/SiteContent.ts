import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteContent extends Document {
  key: string;
  section: string;
  label: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const siteContentSchema = new Schema<ISiteContent>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    section: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    value: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

siteContentSchema.index({ section: 1 });

export const SiteContent = mongoose.model<ISiteContent>('SiteContent', siteContentSchema);
