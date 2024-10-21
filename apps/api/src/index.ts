import { env } from "./modules/env";
import { createServer } from "./server";
import "./types/schema.extensions";

const port = env.PORT;
const server = createServer();

server.listen(port, () => {
  console.log(`API running on ${port}! 🚀`);
});
