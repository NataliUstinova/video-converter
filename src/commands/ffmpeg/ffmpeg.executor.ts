import { CommandExecutor } from "../../core/executor/command.executor";
import {ICommandExecFFmpeg, IFFmpegInput} from "./ffmpeg.types";
import {ChildProcessWithoutNullStreams} from "node:child_process";
import {IStreamLogger} from "../../core/handlers/stream-logger.interface";
import {PromptService} from "../../core/prompt/prompt.service";
import {FileService} from "../../core/files/file.service";
import {FFmpegBuilder} from "./ffmpeg.builder";
import {StreamHandler} from "../../core/handlers/stream.handler";
import { spawn } from "node:child_process";

export class FFmpegExecutor extends CommandExecutor<IFFmpegInput> {
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();
  
  constructor(logger: IStreamLogger) {
    super(logger);
  }
  protected build({width, height, path, name}: IFFmpegInput): ICommandExecFFmpeg {
    const output = this.fileService.getFilePath(path, name, 'mp4');
    const args = (new FFmpegBuilder)
      .input(path)
      .setVideoSize(width, height)
      .output(output);
    return {command: 'ffmpeg', args, output};
  }
  
  protected async prompt(): Promise<IFFmpegInput> {
    const width = await this.promptService.input<number>('Width', 'number');
    const height = await this.promptService.input<number>('Height', 'number');
    const path = await this.promptService.input<string>('Path to a file', 'input');
    const name = await this.promptService.input<string>('File name', 'input');
    return {width, height, path, name}
  }

  protected spawn({output, command, args}: ICommandExecFFmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExists(output);
    return spawn(command, args);  }

  protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream)
  }
}