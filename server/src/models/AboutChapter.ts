import mongoose, { Document, Schema } from 'mongoose';

export interface IAboutChapter extends Document {
  year: string;
  title: string;
  description: string;
  showOnHome: boolean;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const aboutChapterSchema = new Schema<IAboutChapter>(
  {
    year: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    showOnHome: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

aboutChapterSchema.index({ active: 1, sortOrder: 1 });
aboutChapterSchema.index({ active: 1, showOnHome: 1, sortOrder: 1 });

export const AboutChapter = mongoose.model<IAboutChapter>('AboutChapter', aboutChapterSchema);
