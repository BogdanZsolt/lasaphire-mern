import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import passport from './utils/passportConfig.js';
import productRoutes from './routes/productRoutes.js';
import productCategoryRoutes from './routes/productCategoryRoutes.js';
import productCollectionRoutes from './routes/productCollectionRoutes.js';
import productSizeRoutes from './routes/productSizeRoutes.js';
import supplyRoutes from './routes/supplyRoutes.js';
import supplySizeRoutes from './routes/supplySizeRoutes.js';
import supplyCategoryRoutes from './routes/supplyCategoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import postRoutes from './routes/postRoutes.js';
import postCategoryRoutes from './routes/postCategoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import faqCategoryRoutes from './routes/faqCategoryRoutes.js';
import planRoutes from './routes/planRoutes.js';
import contactMessageRoutes from './routes/contactMessageRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename).split('/').slice(0, -1).join('/');
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();
0;
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());

app.use('/api/products', productRoutes);
app.use('/api/productcategories', productCategoryRoutes);
app.use('/api/productcollections', productCollectionRoutes);
app.use('/api/productsizes', productSizeRoutes);
app.use('/api/supplies', supplyRoutes);
app.use('/api/supplysizes', supplySizeRoutes);
app.use('/api/supplycategories', supplyCategoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/postcategories', postCategoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/faqCategories', faqCategoryRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/contact-messages', contactMessageRoutes);
app.use('/api/courses', courseRoutes);

const __dirname = path.resolve();
// app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // any route that is not api will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));