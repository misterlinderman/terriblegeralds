import mongoose, { Document, Schema } from 'mongoose';
import { DEFAULT_THEME_TOKENS } from '../constants/defaultTheme';

export interface IThemePreset extends Document {
  name: string;
  bone: string;
  bone2: string;
  cream: string;
  ink: string;
  inkSoft: string;
  red: string;
  redDeep: string;
  gold: string;
  goldDeep: string;
  teal: string;
  paperLine: string;
  fontDisplay: string;
  fontEditorial: string;
  fontAccent: string;
  fontBody: string;
  fontMono: string;
  displayTracking: string;
  buttonTracking: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const themePresetSchema = new Schema<IThemePreset>(
  {
    name: { type: String, required: true, trim: true },
    bone: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.bone },
    bone2: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.bone2 },
    cream: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.cream },
    ink: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.ink },
    inkSoft: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.inkSoft },
    red: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.red },
    redDeep: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.redDeep },
    gold: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.gold },
    goldDeep: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.goldDeep },
    teal: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.teal },
    paperLine: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.paperLine },
    fontDisplay: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.fontDisplay },
    fontEditorial: {
      type: String,
      required: true,
      trim: true,
      default: DEFAULT_THEME_TOKENS.fontEditorial,
    },
    fontAccent: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.fontAccent },
    fontBody: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.fontBody },
    fontMono: { type: String, required: true, trim: true, default: DEFAULT_THEME_TOKENS.fontMono },
    displayTracking: {
      type: String,
      required: true,
      trim: true,
      default: DEFAULT_THEME_TOKENS.displayTracking,
    },
    buttonTracking: {
      type: String,
      required: true,
      trim: true,
      default: DEFAULT_THEME_TOKENS.buttonTracking,
    },
    active: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

themePresetSchema.index({ active: 1 });

export const ThemePreset = mongoose.model<IThemePreset>('ThemePreset', themePresetSchema);
