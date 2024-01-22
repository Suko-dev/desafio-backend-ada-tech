import { config } from '../config/environment-variables';
import app from './server';
import Logger from '../application/utils/logger';

const port = config.SERVER.PORT;

app.listen(port, () => Logger.log(`Server up and running on port: ${port}`));
