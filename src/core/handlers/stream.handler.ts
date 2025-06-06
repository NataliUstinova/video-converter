import { IStreamLogger } from "./stream-logger.interface";
import {ChildProcessWithoutNullStreams} from "node:child_process";

export class StreamHandler {
  constructor(private logger : IStreamLogger) {}
  
  processOutput(stream: ChildProcessWithoutNullStreams) {
    stream.stdout.on('data', (data: any) => {
      this.logger.log(data.toString());
    })
    
    stream.stderr.on('data', (data: any) => {
      this.logger.error(data.toString())
    })
    
    stream.on('close', () => {
      this.logger.end();
    })
  }
}