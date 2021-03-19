import { lexer } from "../lexer";
import debug from "debug";
import {LOOP_END} from "../constants";

const log = debug('Interpreter')

export class Interpreter {
  public pointer = 0;
  private memory: string[] = [];
  
  private toMemory(str: string) {
    log('adicionando a memoria', str)
    this.memory.push(str);
  }

  public run(line: string) {
    log(`line: ${line}`)

    let pointer = 0;
    let tokenCollector = '';

    while (pointer < line.length) {
      const linePointer = line[pointer];

      log(`line pointer ${linePointer}`)

      if (linePointer !== LOOP_END || linePointer !== ')') {

        log('adicionando no collector', linePointer)
        tokenCollector += line[pointer];
      }

      log('collector', tokenCollector)
      log('line pointer', line[pointer])

      if (line[pointer] === LOOP_END || line[pointer] === ')') {
        if (tokenCollector.includes("(")) {
          let [token, value] = tokenCollector.split('(');
          value = value.substr(0, value.length - 1);
          this.toMemory(token);
          this.toMemory(value);
        } else {
          this.toMemory(tokenCollector);
        }

        tokenCollector = ''
      }
      
      pointer++;
    }

    lexer.run(this.memory)
  }
}