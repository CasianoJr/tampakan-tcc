import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

const server = express();
let initialized = false;

async function bootstrap() {
  if (!initialized) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );
    app.enableCors({
      origin: process.env.CORS_ORIGIN?.split(',') || [
        'http://localhost:5173',
        'http://localhost:4173',
      ],
      credentials: true,
    });
    await app.init();
    initialized = true;
  }
}

export default async function handler(req: any, res: any) {
  await bootstrap();
  server(req, res);
}
