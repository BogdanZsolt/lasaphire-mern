import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import countries from './data/countries.js';
import User from './models/userModel.js';
import Country from './models/countryModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Country.deleteMany();

    const adminUser = await User.find({ email: 'admin@email.com' });

    const sampleCountries = countries.map((country) => {
      return { ...country, user: adminUser[0]._id };
    });

    // console.log(sampleCountries);

    await Country.insertMany(sampleCountries);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Country.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
