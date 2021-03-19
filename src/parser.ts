export class Parser {
  static print(args){
    console.log(args.match(/([^"]+)/)[0])
  }
}