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
import faqRoutes from './routes/faqs';
import contentRoutes from './routes/content';
import contactRoutes from './routes/contact';
import adminEventRoutes from './routes/admin/events';
import adminMenuRoutes from './routes/admin/menu';
import adminFaqRoutes from './routes/admin/faqs';
import adminContentRoutes from './routes/admin/content';
import adminContactRoutes from './routes/admin/contact';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins: string[] =
  process.env.NODE_ENV === 'production'
    ? [process.env.CLIENT_URL].filter((url): url is string => Boolean(url))
    : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/events', adminEventRoutes);
app.use('/api/admin/menu', adminMenuRoutes);
app.use('/api/admin/faqs', adminFaqRoutes);
app.use('/api/admin/content', adminContentRoutes);
app.use('/api/admin/contact', adminContactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API available at http://localhost:${PORT}/api`);
      console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
