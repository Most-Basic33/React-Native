import dotenv from "dotenv";
dotenv.config();
const { SERVER_HOST, SERVER_PORT } = process.env;

export default ({ config }) => {
  return {
    ...config,
    extra: {
      SERVER_HOST,
      SERVER_PORT,
    },
  };
};
