import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import { connectDatabase } from './config/database';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import healthRoutes from './routes/health';
import userRoutes from './routes/users';
import eventRoutes from './routes/events';
import menuRoutes from './routes/menu';
import cateringTierRoutes from './routes/cateringTiers';
import venueRoutes from './routes/venues';
import pressFeatureRoutes from './routes/pressFeatures';
import tikTokFeatureRoutes from './routes/tikTokFeatures';
import aboutChapterRoutes from './routes/aboutChapters';
import wallItemRoutes from './routes/wallItems';
import themeRoutes from './routes/theme';
import faqRoutes from './routes/faqs';
import contentRoutes from './routes/content';
import contactRoutes from './routes/contact';
import adminEventRoutes from './routes/admin/events';
import adminMeRoutes from './routes/admin/me';
import adminMenuRoutes from './routes/admin/menu';
import adminCateringTierRoutes from './routes/admin/cateringTiers';
import adminVenueRoutes from './routes/admin/venues';
import adminPressFeatureRoutes from './routes/admin/pressFeatures';
import adminTikTokFeatureRoutes from './routes/admin/tikTokFeatures';
import adminAboutChapterRoutes from './routes/admin/aboutChapters';
import adminWallItemRoutes from './routes/admin/wallItems';
import adminThemeRoutes from './routes/admin/themes';
import adminFaqRoutes from './routes/admin/faqs';
import adminContentRoutes from './routes/admin/content';
import adminContactRoutes from './routes/admin/contact';

const app = express();
const PORT = process.env.PORT || 3001;

const normalizeOrigin = (url?: string): string | undefined =>
  url?.trim().replace(/\/$/, '');

const allowedOrigins: string[] =
  process.env.NODE_ENV === 'production'
    ? [normalizeOrigin(process.env.CLIENT_URL)].filter((url): url is string => Boolean(url))
    : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth0-Id-Token'],
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/catering-tiers', cateringTierRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/press-features', pressFeatureRoutes);
app.use('/api/tiktok-features', tikTokFeatureRoutes);
app.use('/api/about-chapters', aboutChapterRoutes);
app.use('/api/wall-items', wallItemRoutes);
app.use('/api/theme', themeRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminMeRoutes);
app.use('/api/admin/events', adminEventRoutes);
app.use('/api/admin/menu', adminMenuRoutes);
app.use('/api/admin/catering-tiers', adminCateringTierRoutes);
app.use('/api/admin/venues', adminVenueRoutes);
app.use('/api/admin/press-features', adminPressFeatureRoutes);
app.use('/api/admin/tiktok-features', adminTikTokFeatureRoutes);
app.use('/api/admin/about-chapters', adminAboutChapterRoutes);
app.use('/api/admin/wall-items', adminWallItemRoutes);
app.use('/api/admin/themes', adminThemeRoutes);
app.use('/api/admin/faqs', adminFaqRoutes);
app.use('/api/admin/content', adminContentRoutes);
app.use('/api/admin/contact', adminContactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API available at http://0.0.0.0:${PORT}/api`);
      console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
