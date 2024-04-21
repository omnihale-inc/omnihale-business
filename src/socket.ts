import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? (process.env.PROD_URL as string)
    : "http://127.0.0.1:8000";

export const socket = io(URL);
