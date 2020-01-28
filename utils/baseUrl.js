export const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://localhost/api"
    : "http://localhost:3000/api";
