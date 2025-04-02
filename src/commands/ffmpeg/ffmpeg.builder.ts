//Builder pattern
export class FFmpegBuilder {
  private inputPath: string;
  private options: Map<string, string> = new Map();
  
  constructor() {
    this.options.set('-c:v', 'libx264')
  }
  
  input(inputPath: string): this {
    this.inputPath = inputPath;
    return this;
  }
  
  setVideoSize(width: number, height: number): this {
    this.options.set('-s', `${width}x${height}`)
    return this;
  }
  
  output(outputPath: string) {
    if (!this.inputPath) {
      throw new Error('No input set')
    }
    const args: string[] = ['-i', this.inputPath]
    this.options.forEach((key, value) => {
      args.push(key)
      args.push(value)
    })
    args.push(outputPath);
    return args;
  }
}

