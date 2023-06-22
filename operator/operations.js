const {Output} = require("./schema.js")

class Operator {
    constructor(context) {
        this.context = context;
    }
    context;
    input;
    output;
    setInput(input) {
        this.input = input.__process();
        return this;
    }
    __process() {
        return this;
    }
    getOutput() {
        return this.__process().output.__process();
    }

}

class GenerateUuidOperation extends Operator{
    __process() {
        this.output = new Output(crypto.randomUUID());
        return this;
    }
}

class GenerateTmpstmpOperation extends Operator{

    __process() {
        this.output = new Output(new Date().toISOString());
        return this;
    }
} 

class ReadOperation extends Operator{
    __process() {
        this.output = new Output(this.getAttribute(this.context, this.input.getValue().split(".")));
        return this;
    }

    getAttribute(data, keyArr) {
        let key = isNaN(keyArr[0]) ? keyArr[0] : parseInt(keyArr[0]);
        if (data[key] && data[key] != undefined) {
          if (keyArr.length == 1) {
            return data[key];
          }
          return this.getAttribute(data[key], keyArr.slice(1, keyArr.length));
        }
        return undefined;
    }
}

module.exports={GenerateUuidOperation, GenerateTmpstmpOperation, ReadOperation}