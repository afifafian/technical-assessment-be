import app from './app.js';

const port = process.env.PORT || 3001;

new Promise((resolve) => app.listen({ port }, resolve));
console.log(`🚀 Server ready at ${port}`);
