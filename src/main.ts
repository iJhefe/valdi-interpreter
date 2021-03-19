import {Interpreter} from "./interpreter/interpreter";
import { resolve } from 'path'
import { readFileSync } from "fs";

const interpreter = new Interpreter();

const file = readFileSync(resolve('example', 'exemplo.valdi'), 'utf8');

const context = file.split('\n');

while(interpreter.pointer < context.length) {
  const currentContext = context.shift();

  interpreter.run(currentContext);
}