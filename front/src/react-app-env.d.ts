/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_BASE_URL: "localhost:5000/api";
      REACT_APP_ENV: 'development' | 'production';
    }
  }