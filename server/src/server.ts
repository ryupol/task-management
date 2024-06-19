import { PORT } from "./configs/config";
import app from "./app";
import logger from "./configs/log.config";

app.listen(PORT, () => {
  logger.info(`✅ Server is running on http://localhost:${PORT}`);
});
