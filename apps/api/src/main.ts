import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply Clerk middleware to all routes
  app.use(ClerkExpressWithAuth());
  
  await app.listen(process.env.PORT ?? 3001); // Changing port to 3001 for API
}
bootstrap();
