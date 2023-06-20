import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import userRoute from './user/user.route';
import websiteRoute from './website/website.route';
import pageRoute from './page/page.route';
import reviewRoute from './review/review.route';
import { errorLogger, errorResponder } from './middleware/errorMiddleware';

//Initialize App
const app = express();
app.use(express.json());
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};

corsOptions.credentials = true;
app.use(cors(corsOptions));

//HTML and Static file
app.use('/resources', express.static(path.join(__dirname, 'public')));
app.set('views', `views`);
app.set('view engine', 'hbs');

const mongoUri = process.env.MONGODB_URL;
mongoose.connect(
  mongoUri,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw error;
    console.log('Connected to MongoDB');
  },
);

app.use('/api/user', userRoute)
app.use('/api/website', websiteRoute)
app.use('/api/page', pageRoute);
app.use('/api/review', reviewRoute);
app.use(errorLogger);
app.use(errorResponder);

const LOCAL_PORT = 8081;
const PORT = process.env.APP_PORT || 8081;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
