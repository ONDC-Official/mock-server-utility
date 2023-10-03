const {Output} = require("./schema.js")
const crypto = require('crypto');
const {Input} = require("./schema.js")

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

class EqualOperation extends Operator{
    __process() {
        let flag = 0
        const value = this?.readValue(this?.input?.value[0]?.operation?.input)
        if(this?.input?.value?.includes(value)){
            console.log(value,"Value")
            flag = 1
        }
        this.output = new Output(flag);
        return this;
    }


    readValue(readValue) {
        const read = new ReadOperation(this.context)
        read.input = new Input(this.context, readValue)
        return read.getOutput().getValue()
    }
}

class AndOrOperation extends Operator{
    __process(){
        this.output = new Output(this.match(this.input.value))
        return this
    }

    match(input){
        if(input.length){
            let result = input.map(element => {
                if(element?.operation?.type =='EQUAL'){
                    const EQUAL = new EqualOperation(this.context)
                    EQUAL.input = new Input(this.context,element?.operation?.input)
                    const result  = EQUAL.getOutput().getValue()
                    console.log(result,"result")
                    return result
                }
            });

            if(this.input.type=='AND')return result.includes(0)?false:true
            else if(this.input.type == 'OR') return result.includes(1)?true:false     
        }
    }
}

module.exports={GenerateUuidOperation, GenerateTmpstmpOperation, ReadOperation, EqualOperation, AndOrOperation}