import { ICommandExec } from "../../core/executor/command.types";

export interface IFFmpegInput {
  width: number;
  height: number;
  path: string;
  name: string;
}

export interface ICommandExecFFmpeg extends ICommandExec {
  output: string;
}