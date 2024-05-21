// Define the API URL based on the environment
const URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api.omnihale.com";

export default URL;
