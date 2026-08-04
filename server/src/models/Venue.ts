import mongoose, { Document, Schema } from 'mongoose';

export const VENUE_CATEGORY_ICONS = ['brewery', 'building', 'park', 'event'] as const;
export type VenueCategoryIcon = (typeof VENUE_CATEGORY_ICONS)[number];

export interface IVenue extends Document {
  name: string;
  categoryIcon: VenueCategoryIcon;
  blurb: string;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const venueSchema = new Schema<IVenue>(
  {
    name: { type: String, required: true, trim: true },
    categoryIcon: {
      type: String,
      required: true,
      enum: VENUE_CATEGORY_ICONS,
      default: 'brewery',
    },
    blurb: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

venueSchema.index({ active: 1, sortOrder: 1 });

export const Venue = mongoose.model<IVenue>('Venue', venueSchema);
