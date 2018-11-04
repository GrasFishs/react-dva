const env = process.env.NODE_ENV;

export const baseUrl = env === 'development' ? 'http://localhost:3000/' : '';
