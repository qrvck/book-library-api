declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST?: string;
      PORT?: string;

      POSTGRES_HOST?: string;
      POSTGRES_PORT?: string;
      POSTGRES_DB?: string;
      POSTGRES_USER?: string;
      POSTGRES_PASSWORD?: string;
    }
  }
}
