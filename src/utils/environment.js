const environment = {
  CRYPTO_SECRET_KEY: import.meta.env.VITE_APP_CRYPTO_SECRET_KEY,
  CRYPTO_SECRET_VALUE: import.meta.env.VITE_APP_CRYPTO_SECRET_VALUE,
  SERVER_URL: import.meta.env.VITE_APP_SERVER_URL,
  NODE_ENV: import.meta.env.NODE_ENV,
};

export default environment;
