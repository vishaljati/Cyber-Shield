import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.EXTENSION_CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

import analyzeRouter from './routes/analyze.routes.js';
import healthRouter from "./routes/healthcheck.routes.js"

app.use('/api/v1/analyze', analyzeRouter);
app.use("/api/v1/healthcheck",healthRouter)

export default app;
