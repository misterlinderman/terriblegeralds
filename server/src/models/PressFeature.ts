import mongoose, { Document, Schema } from 'mongoose';

export interface IPressFeature extends Document {
  outlet: string;
  blurb: string;
  ctaLabel: string;
  thumbLabel: string;
  linkUrl?: string;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const pressFeatureSchema = new Schema<IPressFeature>(
  {
    outlet: { type: String, required: true, trim: true },
    blurb: { type: String, required: true, trim: true },
    ctaLabel: { type: String, required: true, trim: true },
    thumbLabel: { type: String, required: true, trim: true },
    linkUrl: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

pressFeatureSchema.index({ active: 1, sortOrder: 1 });

export const PressFeature = mongoose.model<IPressFeature>('PressFeature', pressFeatureSchema);
