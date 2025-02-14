import dotenv from 'dotenv';
dotenv.config();


export const customConfig = {
  baseUrl: process.env.BASE_URL || '',
  httpCredentials: {
    username: process.env.HTTP_USERNAME || '',
    password: process.env.HTTP_PASSWORD || '',
  },
};
