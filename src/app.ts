import fastify from 'fastify';
import githubRoutes from './http/routes/githubRoutes';
import dotenv from 'dotenv';
import fastifyMultipart from '@fastify/multipart';
import fastifyFormbody from '@fastify/formbody';
import fastifyCors from '@fastify/cors';

dotenv.config();

const app = fastify({ logger: true });
app.register(fastifyCors, {
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
});
app.register(fastifyFormbody);
app.register(fastifyMultipart);

app.register(githubRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
