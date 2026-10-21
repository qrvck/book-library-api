declare global {
  namespace NodeJS {
    interface IProcessEnv {
      EXPRESS_HOST?: string;
      EXPRESS_PORT?: string;

      POSTGRES_HOST?: string;
      POSTGRES_PORT?: string;
      POSTGRES_DB?: string;
      POSTGRES_USER?: string;
      POSTGRES_PASSWORD?: string;
    }
  }
}
