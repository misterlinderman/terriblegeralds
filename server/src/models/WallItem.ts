import mongoose, { Document, Schema } from 'mongoose';

export interface IWallItem extends Document {
  caption: string;
  imageUrl?: string;
  linkUrl?: string;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const wallItemSchema = new Schema<IWallItem>(
  {
    caption: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    linkUrl: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

wallItemSchema.index({ active: 1, sortOrder: 1 });

export const WallItem = mongoose.model<IWallItem>('WallItem', wallItemSchema);
