import mongoose, { Document, Schema } from 'mongoose';

export interface ICateringTier extends Document {
  name: string;
  price: string;
  includes: string[];
  blurb?: string;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const cateringTierSchema = new Schema<ICateringTier>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    includes: { type: [String], default: [] },
    blurb: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

cateringTierSchema.index({ active: 1, sortOrder: 1 });

export const CateringTier = mongoose.model<ICateringTier>('CateringTier', cateringTierSchema);
