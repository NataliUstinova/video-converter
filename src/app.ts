import {FFmpegExecutor} from "./commands/ffmpeg/ffmpeg.executor";
import {ConsoleLogger} from "./out/console-logger/console-logger";

export class App {
  async run() {
    await new FFmpegExecutor(ConsoleLogger.getInstance()).execute();
  }
} 

const app = new App;
app.run()