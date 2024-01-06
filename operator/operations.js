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
        let value = this?.readValue(this?.input?.value[0]?.operation?.input)
        if(value==undefined)value='undefined' //handle cases where value is not present
        if(this?.input?.value?.includes(value)){
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
                    return EQUAL.getOutput().getValue()
                }
            });
            if(this.input.type=='AND')return result.includes(0)?false:true
            else if(this.input.type == 'OR') return result.includes(1)?true:false     
        }
    }
}

class equalReturn extends Operator{
    __process(){
        this.output = new Output(this.match(this.input.value))
        return this
    }

    match(input){
        for(let i = 0 ;i < input.length ; i++){
            if(input[i].operation.type=="EQUAL"){
                const EQUAL = new EqualOperation(this.context)
                EQUAL.input = new Input(this.context,input[i]?.operation?.input)
                if(EQUAL.getOutput().getValue()){
                    return input[i]?.operation?.input.value[2]
                }
            }else{
                const GREATERLESSTHAN = new greaterORlessthan(this.context)
                GREATERLESSTHAN.input = new Input(this.context,input[i]?.operation?.input,input[i].operation.type)
                if(GREATERLESSTHAN.getOutput().getValue()){
                    return input[i]?.operation?.input.value[2]
                }
            }
        }
    }
}

class greaterORlessthan extends Operator{
    __process(){
        this.output = new Output(this.match(this.input.value))
        return this
    }
    match(){
        const value = parseInt(this?.readValue(this?.input?.value[0]?.operation?.input))
        this.input.value[1]=parseInt(this?.input?.value[1])
        return this.input.type ==="GREATERTHAN"&&value>this?.input?.value[1]?1:this.input.type ==="LESSTHAN"&&value<this?.input?.value[1]?1:0
    }
    readValue(readValue) {
        const read = new ReadOperation(this.context)
        read.input = new Input(this.context, readValue)
        return read.getOutput().getValue()
    }
}

class stringifybase64 extends Operator{
    __process(){
        this.output = new Output(this.stringify())
        return this
    }

    stringify(){
        let response = JSON.stringify(this.context.req_body)
        response = Buffer.from(response, 'utf-8').toString('base64'); //convert to base64
        return response
    }
}


module.exports={GenerateUuidOperation, GenerateTmpstmpOperation, ReadOperation, EqualOperation, AndOrOperation, equalReturn,stringifybase64}