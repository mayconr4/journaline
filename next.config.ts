import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: "./journaline", // caminho relativo para a raiz real do projeto
  },
};
export default nextConfig;
