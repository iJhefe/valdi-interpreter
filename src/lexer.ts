import {tokens} from "./tokens/tokens";
import {Parser} from "./parser";
import debug from "debug";

interface Loop {
  counter: number;
  step: number;
  line: string;
  pointer: number;
}

const log = debug('Lexer')

class Lexer {
  private data: string[] = [];
  private pointer = 0;
  private line = '';
  private inLoop = false;
  private loopPointer = 0;
  private loops: Loop[] = [];

  private read(line: string, pointer: number) {
    log('line', line)
    log('pointer', pointer)

    tokens.valdi.map((token) => {
      log(`inclui chave: ${token.key}, ${line.includes(token.key)}`)
      if (line.includes(token.key)) {
        switch (token.alias) {
          case "PRINT":
            log('PRINT')
            const currentPointer = this.data[pointer + 1];

            if (currentPointer[currentPointer.length - 1] === '"') {
              Parser.print(this.data[pointer + 1])
            } else {
              let point = this.pointer + 1;
              let str = "";
              while (this.data[point].includes(")") == false) {
                str += this.data[point] + " "
                point++;
              }
              str += this.data[point]

              Parser.print(str.substr(0, str.length - 1))
            }
            break;

          case "LOOP":
            log('LOOP')
            log(`inLoop: ${this.inLoop}`)
            log('data', this.data)
            const loopValue = this.data[pointer + 1];

            log('valor do loop', loopValue)

            const counter = Number.parseInt(loopValue) || 0;

            log('loop counter', counter);

            if (!this.inLoop) {
              const loop = {
                counter,
                step: 0,
                line,
                pointer
              };

              log('Adicionando loop')
              log(loop);

              this.loops.push(loop)

              this.loopPointer++;
              this.inLoop = true;
            }

            log(`Ponteiro de loop atual: ${this.loopPointer}`);
            log(`inLoop: ${this.inLoop}`)
            break;

          case "END":
            log('END');
            if (this.inLoop) {
              const currentLoop = this.loops[this.loopPointer - 1];

              log('Loop atual')
              log(currentLoop)

              if (currentLoop.step < currentLoop.counter) {
                currentLoop.step++;
                this.pointer = currentLoop.pointer
                this.line = currentLoop.line
              }

              if (currentLoop.step === currentLoop.counter) {
                log('Loop concluído')
                this.inLoop = false;
              }

              log('loop pointer', this.loopPointer)
              log('poiner', pointer)
              log(`line: ${this.line}`)
            }
            break;
        }
      }
    })
  }

  public run(object: string[]) {
    this.data = object;

    log('run', object)

    while (this.pointer < this.data.length) {
      this.read(this.data[this.pointer], this.pointer)
      this.pointer++;
    }
  }
}

export const lexer = new Lexer();