import http from 'http';
import app from './app';
import { connectDB } from './config/database';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to Database
  await connectDB();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`🚀 AVELLIN Backend is running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Handle sudden shutdowns
  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received. Closing HTTP server...');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });
};

startServer();
