import mongoose, { Document, Schema } from 'mongoose';

export interface IFaq extends Document {
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

faqSchema.index({ published: 1, sortOrder: 1 });

export const Faq = mongoose.model<IFaq>('Faq', faqSchema);
