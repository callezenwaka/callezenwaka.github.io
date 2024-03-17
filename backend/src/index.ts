import express, { Application, Express, NextFunction, Request, Response } from "express";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import cors from "cors";
import path from "path";;
import * as http from "http";
import dotenv from "dotenv";

// dotenv.config();
// import 'dotenv/config';
// import { mainRouter } from '@routes/index';
import { routers } from './routes';
// import routers from '@/routes'; // Using "@" for path alias
// import blogRoutes from "./routes/blog";

const app: Application = express();
const server: http.Server = http.createServer(app);

// Initialize firebase admin sdk config
initializeApp({
  credential: applicationDefault(),
});

// Route middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ping healthz route
app.get('/ping',async (req: Request, res: Response) => {
  try {
    return res.status(200).json('Pong ⚾');
  } catch (error) {
    return res.status(500).json('Internal Server Error!');
  }
});

// Public routes
// app.use('/api/v1/commercial', commercial);
// Verify request
// app.use('/', isAuthenticated);
// Private routes
app.use('/api/v1', routers);
// app.use('/api', mainRouter);

// Ping home route
app.get('/', (req: Request, res: Response) => {
  try {
    return res.status(200).json('Ok');
  } catch (error) {
    return res.status(500).json('Internal Server Error!');
  }
});

// notfound route handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = {
    statusText: new Error('Not Found'),
    status: 404
  };
  next(error);
})

// error handler
app.use((error: {message: string, status: number}, req: Request, res: Response, next: NextFunction) => {
  // console.log('error: ', error);
  res.json({
    message: error.message,
    status: error.status || 500
  });
});

// const app: Express = express();
// const port = process.env.PORT || 4000;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

// Set up port and start the server
server.listen( process.env.PORT, () => {
  console.log(`Server running at:`);
  console.log(`- Local: http://localhost:${process.env.PORT}`);
  console.log(`- Network: http://000.000.0.000:${process.env.PORT}`);
});

export default app;