/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly [key: string]: string | number;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
