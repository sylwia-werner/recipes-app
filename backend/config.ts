export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database_url: process.env.DATABASE_URL,
  at_secret: process.env.AT_SECRET,
  rt_secret: process.env.RT_SECRET,
  at_expiration: parseInt(process.env.AT_EXPIRATION),
  rt_expiration: parseInt(process.env.RT_EXPIRATION),
});
