import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from '../user/user.route';
import websiteRoute from '../website/website.route';
import pageRoute from '../page/page.route';
import reviewRoute from '../review/review.route';
import { errorLogger, errorResponder } from '../middleware/errorMiddleware';
const swaggerJsdoc = require("swagger-jsdoc");
require('dotenv').config();
require('babel-register');


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

const LOCAL_PORT = 8081;
const PORT = process.env.APP_PORT || 8081;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "dragn-drop-server",
      version: "1.0.0",
      description:
        "Express.js and MongoDb Backend API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Semih Ataman",
        email: "semihataman16@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
      {
        url: `http://localhost:8082`,
      }
    ],
  },
  apis: ["./page/*.js", "./review/*.js", "./user/*.js", "./website/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// //HTML and Static file
// app.use('/resources', express.static(path.join(__dirname, 'public')));
// app.set('views', `views`);

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
app.use('*', (request, response) => {
  response.status(404).json({ message: 'Route not found!' });
});
app.use(errorLogger);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
