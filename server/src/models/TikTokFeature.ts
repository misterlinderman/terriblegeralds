import mongoose, { Document, Schema } from 'mongoose';

export interface ITikTokFeature extends Document {
  handle: string;
  views: string;
  linkUrl?: string;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tikTokFeatureSchema = new Schema<ITikTokFeature>(
  {
    handle: { type: String, required: true, trim: true },
    views: { type: String, required: true, trim: true },
    linkUrl: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

tikTokFeatureSchema.index({ active: 1, sortOrder: 1 });

export const TikTokFeature = mongoose.model<ITikTokFeature>('TikTokFeature', tikTokFeatureSchema);
