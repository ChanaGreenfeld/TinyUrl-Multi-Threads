import dotenv from 'dotenv';
import mongoose from 'mongoose';


import App from './app';

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  App.start(process.env.PORT);
})();

