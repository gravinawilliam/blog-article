import 'dotenv/config';

const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.BLOG_ARTICLE_PORT,
  dataBaseDefault: {
    type: process.env.DB_DEFAULT_TYPE,
    host: process.env.DB_DEFAULT_HOST,
    port: parseInt(process.env.DB_DEFAULT_PORT, 10),
    username: process.env.DB_DEFAULT_USERNAME,
    password: process.env.DB_DEFAULT_PASSWORD,
    database: process.env.DB_DEFAULT_DATABASE,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV === 'PROD' ? 'production' : 'development',
  },
  dataReplication: {
    key: process.env.DATA_REPLICATION_KEY,
  },
  url: {
    internalMicroServices: {
      dataReplication: process.env.URL_BASE_DATA_REPLICATION,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: process.env.JWT_ALGORITHM,
    issuer: process.env.JWT_ISSUER,
  },
};

export default envConfig;
